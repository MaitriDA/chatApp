import React, { useEffect, useState } from 'react';
import {
    Container, CssBaseline, Avatar, Typography,
    Button, Grid, Link, makeStyles, Card, CardContent
} from '@material-ui/core';
import { LockRounded } from '@material-ui/icons';
import { ScaleLoader } from 'react-spinners';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Vector1 from '../images/vector1.jpg';
import fire from '../helper/db';
import './common.css';
import None from '../avatar/None.jpg';
import firebase from 'firebase/app';
import {validName} from './regex.jsx';

const SignUp = (props) => {

    const classes = useStyles();
    const db=fire.firestore();


    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState('noprofile.png');
    const [nameErr, setNameErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);

    const handleName = (event) => {
        setName(event.target.value);
        if (!validName.test(name)) {
            setNameErr(true);
        }
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }
    const handleSignUp = () => {
        setLoading(true);
        fire.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                if (response) {
                    props.toggle();
                    toast.success('User Registered Successfully');
                    db.collection('Users')
                        .doc(email)
                        .set({
                            name:name,
                            email:email,
                            photo_url:avatar,
                            phone:phoneNumber
                        })
                    db.collection('Users')
                    .doc('allusers')
                    .update({
                        "emails": firebase.firestore.FieldValue.arrayUnion(email),
                        "phones":firebase.firestore.FieldValue.arrayUnion(phoneNumber),
                        "names":firebase.firestore.FieldValue.arrayUnion(name),
                        "photo_urls":firebase.firestore.FieldValue.arrayUnion(avatar),
    
                    })
                }
                setLoading(false);
            }).catch((error) => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        toast.error(error.message);
                        break;
                    case 'auth/invalid-email':
                        toast.error(error.message);
                        break;
                    case 'auth/weak-password':
                        toast.error(error.message);
                        break;
                    default:
                        break;
                }
                setLoading(false);
            });
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== password) {
                return false;
            }
            return true;
        });
        return () => {
            ValidatorForm.removeValidationRule('isPasswordMatch');
        }
    }, [password])

    return (

        <div>
            <div className="card cardSignUp">
                <img src={Vector1} className="imagels imgSignUp" />
                <div className="logInSignUp signUp">
                    <ToastContainer />
                    <CssBaseline>
                        <div className="lsTitle">SIGN UP</div>
                        <ValidatorForm
                            onSubmit={handleSignUp}
                            className="ValidationFrom">
                            
                            <TextValidator
                            className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="Email"
                                    onChange={handleEmail}
                                    name="email"
                                    size="small"
                                    value={email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                    autoComplete='off'
                                />
                                <TextValidator
                                className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    label="Name"
                                    onChange={handleName}
                                    name="name"
                                    size="small"
                                    value={name}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    autoComplete="off"
                                />
                                <TextValidator
                                className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    label="Phone Number"
                                    onChange={handlePhoneNumber}
                                    name="name"
                                    size="small"
                                    value={phoneNumber}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    autoComplete="off"
                                />
                                
                                <TextValidator
                                className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="Password"
                                    onChange={handlePassword}
                                    name="password"
                                    type="password"
                                    size="small"
                                    value={password}
                                    validators={['required',]}
                                    errorMessages={['this field is required']}
                                    autoComplete='off'
                                />
                                <TextValidator
                                className={classes.textField}
                                    variant="outlined"
                                    label="Confirm password"
                                    fullWidth
                                    onChange={handleConfirmPassword}
                                    name="confirmPassword"
                                    type="password"
                                    size="small"
                                    validators={['isPasswordMatch', 'required']}
                                    errorMessages={['password mismatch', 'this field is required']}
                                    value={confirmPassword}
                                    autoComplete="off"
                                />
                                
                                {loading ? (
                                    <ScaleLoader className={classes.loading}
                                        size={'50px'}
                                        color={"#0c2637"}
                                        loading={loading}
                                    />
                                ) : (
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className="signUpBtn"
                                        className={classes.submit}>
                                        Sign Up
                                    </Button>
                                )}
                                <br/>
                            <Link onClick={props.toggle} className={classes.pointer} variant="body2">
                                {"Already have an account? Login"}
                            </Link>
                            
                        </ValidatorForm>
                    </CssBaseline>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '300px',
        marginTop: '10px'
    },
    submit: {
        background: 'linear-gradient(45deg, #0c2637 30%, #0c2637 90%)',
        margin: theme.spacing(3, 0, 2),
        color: '#feefec',
        width: '100px',
        marginTop: '20px'
        
    },
    pointer: {
        cursor: 'pointer',
        color: '#0c2637',
        marginTop: '-30px'
    },
    loading:{
        marginTop:'20px'
    }
}));

export default SignUp;
