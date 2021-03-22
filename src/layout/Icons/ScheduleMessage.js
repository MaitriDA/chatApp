import React from 'react';
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
    return (
        <div>

            <LightTooltip title="Schedule Message" placement="right">
                <Button onClick={handleClickOpen}>
                    <ScheduleIcon style={{ fontSize: 35, color: "white" }} />
                </Button>
            </LightTooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{ width: 'fir-content' }}>
                <div>
                    <DialogTitle id="form-dialog-title">Schedule Message Page</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div>

                                <form className={classes.root} noValidate autoComplete="off">
                                    <TextField id="standard-basic" label="Select Contact (email)" />
                                </form>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="datetime-local"
                                        label="Next appointment"
                                        type="datetime-local"
                                        defaultValue="2017-05-24T10:30"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
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