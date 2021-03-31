import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles, Theme, makeStyles} from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import Tooltip from '@material-ui/core/Tooltip';
import './Profile.css';
import fire from '../../helper/db';
import {Avatar} from '@material-ui/core';

import avatar1 from '../../avatar/avatar1.jpg';
import avatar2 from '../../avatar/avatar2.jpg';
import avatar3 from '../../avatar/avatar3.jpg';
import avatar4 from '../../avatar/avatar4.jpg';
import avatar5 from '../../avatar/avatar5.jpg';
import avatar6 from '../../avatar/avatar6.jpg';

export default function Profile () {
  const [open, setOpen] = React.useState (false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen (true);
  };

  const handleClose = () => {
    setOpen (false);
  };
  const LightTooltip = withStyles ((theme: Theme) => ({
    tooltip: {
      backgroundColor: '#feefec',
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 15,
      marginTop: 40,
      marginLeft: -10,
    },
  })) (Tooltip);

  const db = fire.firestore ();
  const [userName, setUserName] = useState ('');
  const [userEmail, setUserEmail] = useState ('');

  if (localStorage.getItem ('user') !== null) {
    const ls = JSON.parse (localStorage.getItem ('user')).email;
    db
      .collection ('User')
      .doc (ls)
      .get ()
      .then (function (doc) {
        if (doc.exists) {
          var UserName = doc.data ().name;
          console.log ('USERNAME', UserName);
          setUserName (UserName);
          setUserEmail (ls);
        } else {
          console.log ('No such Document found');
        }
      })
      .catch (function (error) {
        console.log ('Error getting document: ', error);
      });
  }



  return (
    <div>
      <LightTooltip title="My Profile" placement="right">
        <Button onClick={handleClickOpen}>
          <PersonIcon style={{fontSize: 35, color: 'white'}} />
        </Button>
      </LightTooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogContent style={{backgroundColor: '#feefec'}}>
          <DialogContentText
            style={{backgroundColor: 'white', borderRadius: '15px'}}
          >

            <div className="profileMain">
              <div className="profilePicture">
                <div className="picture"></div>
                <div className="avatar">
                  <div className="avatarHeading">AVATAR</div>
                  <div className="changedp">
                    <Button>
                      <Avatar
                        src={avatar1}
                        style={{
                          height: '45px',
                          width: '45px',
                          border: '1px solid black',
                        }}
                      />
                    </Button>
                    <Button>
                      <Avatar
                        src={avatar2}
                        style={{
                          height: '45px',
                          width: '45px',
                          border: '1px solid black',
                        }}
                      />
                    </Button>
                    <Button>
                      <Avatar
                        src={avatar3}
                        style={{
                          height: '45px',
                          width: '45px',
                          border: '1px solid black',
                        }}
                      />
                    </Button>
                    <Button>
                      <Avatar
                        src={avatar4}
                        style={{
                          height: '45px',
                          width: '45px',
                          border: '1px solid black',
                        }}
                      />
                    </Button>
                    <Button>
                      <Avatar
                        src={avatar5}
                        style={{
                          height: '45px',
                          width: '45px',
                          border: '1px solid black',
                        }}
                      />
                    </Button>
                    <Button>
                      <Avatar
                        src={avatar6}
                        style={{
                          height: '45px',
                          width: '45px',
                          border: '1px solid black',
                        }}
                      />
                    </Button>
                  </div>
                </div>
                <div className="customImage">
                  <Button onClick={handleClose} className={classes.submit}>
                    Custom image
                  </Button>
                </div>
              </div>
              <div className="information">
                <div className="profileInput">
                  <div className="profileHeading">My Profile</div>
                  <TextField
                    id="filled-margin-normal"
                    style={{width: 270}}
                    label="User Name"
                    fullwidth
                    multiline="true"
                    placeholder="Enter the User Name"
                    value={userName}
                  />
                </div>
                <div className="profileInput">

                  <TextField
                    id="filled-margin-normal"
                    style={{width: 270}}
                    label="Email"
                    fullwidth
                    multiline="true"
                    placeholder="Enter the email"
                    value={userEmail}
                  />
                </div>
                <div className="profileInput">

                  <TextField
                    id="filled-margin-normal"
                    style={{width: 270}}
                    label="About Me"
                    fullwidth
                    multiline="true"
                    placeholder="Enter the Bio"
                  />
                </div>
                <div className="profileInput">

                  <TextField
                    id="filled-margin-normal"
                    style={{width: 270}}
                    label="Contact Number"
                    fullwidth
                    multiline="true"
                    placeholder="Enter the Mobile Number"
                  />
                </div>

                  <div className="profileButton">
                    <DialogActions>
                      <div className="buttonArea">

                        <div className="cancelButton">
                          <Button onClick={handleClose} className={classes.submit}>
                            Cancel
                          </Button>
                        </div>
                        <div className="doneButton">
                          <Button onClick={handleClose} className={classes.submit}>
                            Done
                          </Button>
                        </div>
                      </div>
                    </DialogActions>
                  </div>
              </div>
            </div>

          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  submit: {
      background: 'linear-gradient(45deg, #0c2637 30%, #0c2637 90%)',
      color: '#feefec',
  },
  custom:{
    width:'150px'
  }
}));
