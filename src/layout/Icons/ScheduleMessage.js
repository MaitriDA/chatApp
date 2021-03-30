import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import fire from '../../helper/db';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import './ScheduleMessage.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
  

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function ScheduleMessage() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [contact, setContact] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const db=fire.firestore();
    const [selectedDate, handleDateChange] = useState(new Date());
    console.log("Date", selectedDate)

    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setContact("");
        setTitle("");
        setMessage("");
        setOpen(false);
    };
    const handleScheduleMsg = () =>{
        console.log("Ok");
    };
    const currentDate=new Date();
    const interval=selectedDate-currentDate;
    
    const handleDone = () => {
        
        if (localStorage.getItem('user') !== null) {
            const userEmail = JSON.parse(localStorage.getItem("user")).email;
            setTimeout(() => {
                db.collection('User')
                    .doc(userEmail)
                    .collection('Chats')
                    .doc(contact)
                    .collection('messages')
                    .doc(title)
                    .set({
                        message: message,
                        conatct: contact,
                        my: userEmail,
                        timestamp: selectedDate,
                    })
              }, interval);
              setTimeout(() => {
                db.collection('User')
                    .doc(contact)
                    .collection('Chats')
                    .doc(userEmail)
                    .collection('messages')
                    .doc(title)
                    .set({
                        message: message,
                        conatct: contact,
                        my: userEmail,
                        timestamp: selectedDate,
                    })
              }, interval);
        }
        else {
            console.log('chat area error');
        }setContact("");
        setTitle("");
        setMessage("");

        setOpen(false);
    };
    const LightTooltip = withStyles((theme: Theme) => ({
        tooltip: {
            backgroundColor: '#feefec',
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 15,
            marginTop: 40,
            marginLeft: -10
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }))(Tooltip);



    const handleContact = (event) => {
        setContact(event.target.value);
        
    }
    const handleTitle = (event) => {
        setTitle(event.target.value);
        
    }
    const handleMessage = (event) => {
        setMessage(event.target.value);
    }
    console.log('Date',selectedDate);

    return (
        <div>

            <LightTooltip title="Schedule Message" placement="right">
                <Button onClick={handleClickOpen}>
                    <ScheduleIcon style={{ fontSize: 35, color: "white" }} />
                </Button>
            </LightTooltip>
            <Dialog 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="sm">
                <div>

                    <DialogContent>
                        <DialogContentText>
                            <div>Schedule Messages</div>
                            <div className="SMessage">
                                <div className="scheduleMessageMain">

                                        <div className="input">
                                            <TextField
                                                id="filled-margin-normal"
                                                style={{ width: 270 }}
                                                label="Contact"
                                                fullwidth multiline="true"
                                                placeholder="Enter the email"
                                                onChange={handleContact}
                                                value={contact}
                                            />
                                        </div>


                                        <div className="input">
                                            <TextField
                                                id="outlined"
                                                label="Title"
                                                style={{ width: 270 }}
                                                multiline="true"
                                                placeholder="Enter the message title"
                                                onChange={handleTitle}
                                                value={title}
                                            />
                                        </div>
                                        <div className="input">
                                            <TextField
                                                id="outlined"
                                                label="Message"
                                                style={{ width: 270 }}
                                                multiline="true"
                                                placeholder="Enter your message"
                                                onChange={handleMessage}
                                                value={message}
                                            />
                                        </div>
                                        <div className="dateInput">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Date picker dialog"
                                                format="MM/dd/yyyy"
                                                value={selectedDate}
                                                style={{ width: 270 }}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="time-picker"
                                                label="Time picker"
                                                value={selectedDate}
                                                style={{ width: 270 }}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                        </div>
                                </div>
                                <div className="seeMessages">
                                    See cheduled Msg
                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <div className="cancelDoneRight">
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleDone} color="primary">
                                Done
                            </Button>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}