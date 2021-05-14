import React, { useState } from 'react';
import { Container, CssBaseline, Avatar, Typography, Button, Grid, Link, makeStyles, Card, CardContent } from '@material-ui/core';
import { Validation, TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { ScaleLoader } from 'react-spinners';
import './common.css';
import { ToastContainer, toast } from 'react-toastify';
import Vector1 from '../images/vector4.jpg';
import fire from '../helper/db';

const Login = (props) => {

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleLogin = () => {
        setLoading(true);
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const { user } = response;
                const data = {
                    userId: user.uid,
                    email: user.email
                }
                localStorage.setItem('user', JSON.stringify(data));
                const storage = localStorage.getItem('user');
                const loggedInUser = storage !== null ? JSON.parse(storage) : null;
                props.loggedIn(loggedInUser);
                setLoading(false);
            }).catch(error => {
                toast.error(error.message);
                setLoading(false);
            });
    }
    return (
        <div>
            <div className="card">
                <img src={Vector1} className="imagels" />
                <div className="logInSignUp">
                    <ToastContainer />
                    <CssBaseline>
                        <div className="lsTitle">LOGIN</div>
                            <ValidatorForm
                                className="ValidationFrom"
                                onSubmit={handleLogin}
                                onError={errors => {
                                    for (const err of errors) {
                                        console.group(err.props.errorMessages[0])
                                    }
                                }}>
                                <TextValidator
                                    className={classes.textField}
                                    color="primary"
                                    variant="outlined"
                                    margin="normal"
                                    label="Email"
                                    onChange={handleEmail}
                                    name="email"
                                    value={email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                    autoComplete='off'
                                />
                                <TextValidator
                                    className={classes.textField}
                                    color="primary"
                                    variant="outlined"
                                    margin="normal"
                                    label="Password"
                                    onChange={handlePassword}
                                    name="password"
                                    value={password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    autoComplete='off'
                                    type='password'
                                />
                                <br/>
                                {loading ? (
                                    <ScaleLoader
                                        size={'50px'}
                                        color={"#0c2637"}
                                        loading={loading}
                                        className="loading"
                                    />
                                ) : (
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={classes.submit}>
                                        Login In
                                    </Button>
                                )}
                                <br />
                                <Link onClick={props.toggle} className={classes.pointer} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </ValidatorForm>
                    </CssBaseline>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    submit: {
        background: 'linear-gradient(45deg, #0c2637 30%, #0c2637 90%)',
        color: '#feefec',
        width: '100px'
    },
    pointer: {
        cursor: 'pointer',
        color: '#0c2637'
    }
}));

export default Login;
