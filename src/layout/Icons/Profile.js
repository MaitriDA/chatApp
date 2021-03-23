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
          <PersonIcon style={{ fontSize: 35, color: "white" }} />
        </Button>
      </LightTooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{ width: 'fir-content' }}>
        <DialogContent>
          <DialogContentText>
            <div className="profileContainer">

              <div className="left">
                <img src="https://i.imgur.com/cMy8V5j.png" alt="user" width="100" />
                <h4>Ruchika Wadhwa</h4>
                <p>UI Developer</p>
              </div>
              <div className="right">
                <div className="info">
                  <h3>Profile</h3>
                  <div className="info_data">
                    <div className="data">
                      <h4>Email</h4>
                      <p>ruchika01.rw@gmail.com</p>
                    </div>
                    <div className="data">
                      <h4>Phone</h4>
                      <p>9579483827</p>
                    </div>
                  </div>
                  <div className="abouts">
                    <h3>About</h3>
                    <div className="about_data">
                      <div className="data">
                        <h4 className="interest">Interests</h4>
                        <p className="interestP">Lorem ipsum dolor sit amet.</p>
                      </div>
                      <div className="data">
                        <h4 className="interest">Birthday</h4>
                        <p className="interestP">dolor sit amet.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
      </Dialog>
    </div>
  );
}