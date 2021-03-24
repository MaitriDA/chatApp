import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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

    const [selectedDate, handleDateChange] = useState(new Date());
    console.log("Date",selectedDate)
    return (
        <div>

            <LightTooltip title="Schedule Message" placement="right">
                <Button onClick={handleClickOpen}>
                    <ScheduleIcon style={{ fontSize: 35, color: "white" }} />
                </Button>
            </LightTooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{ width: 'fir-content' }}>
                <div>

                    <DialogContent>
                        <DialogContentText>
                            <div>Schedule Messages</div>
                            <div className="schedulemessageMain">

                                <div className="emailInput">
                                    <TextField id="filled-margin-normal" style={{ width: 270 }} label="Contact" fullwidth multiline="true" placeholder="Enter the email" />
                                </div>


                                <div className="titleInput">
                                    <TextField id="outlined" label="Title" style={{ width: 270 }} multiline="true" placeholder="Enter the message title" />
                                </div>
                                <div className="titleInput">
                                    <TextField id="outlined" label="Message" style={{ width: 270 }} multiline="true" placeholder="Enter your message" />
                                </div>

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
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                </Button>
                        <Button onClick={handleClose} color="primary">
                            Done
                </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}