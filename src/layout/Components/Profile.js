import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, Theme, makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import Tooltip from '@material-ui/core/Tooltip';
import './Profile.css';

export default function Profile() {
  const [open, setOpen] = React.useState(false);

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
  }))(Tooltip);
  return (
    <div>
      <LightTooltip title="My Profile" placement="right">
              <Button onClick={handleClickOpen}>
                <PersonIcon style={{fontSize:35,color:"white"}}/>
              </Button>
            </LightTooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{width:'fir-content'}}>
          <div className="demo1">
            <DialogTitle id="form-dialog-title">My Profile</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <div className="demo">
                        Profile Page content
                        
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