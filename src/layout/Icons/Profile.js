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

import None from '../../avatar/None.jpg';
import avatar1 from '../../avatar/avatar1.jpg';
import avatar2 from '../../avatar/avatar2.jpg';
import avatar3 from '../../avatar/avatar3.jpg';
import avatar4 from '../../avatar/avatar4.jpg';
import avatar5 from '../../avatar/avatar5.jpg';
import avatar6 from '../../avatar/avatar6.jpg';

export default function Profile () {
  const avatarLst=['None','avatar1']
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
  const [userPhone,setUserPhone]=useState('');
  const [avatar,setAvatar]=useState('None');

  const handleAvatar1=()=>{
    console.log('Clicked')
    if (localStorage.getItem ('user') !== null) {
      const ls = JSON.parse (localStorage.getItem ('user')).email;
      db.collection ('Users')
        .doc (ls)
        .update({
          avatar:avatar1

        })
        .catch (function (error) {
          console.log ('Error getting document: ', error);
        });
        console.log('Clicked completed');
    }
  }

  const handleAvatar2=()=>{
    console.log('Clicked')
    if (localStorage.getItem ('user') !== null) {
      const ls = JSON.parse (localStorage.getItem ('user')).email;
      db.collection ('Users')
        .doc (ls)
        .update({
          avatar:avatar2

        })
        .catch (function (error) {
          console.log ('Error getting document: ', error);
        });
        console.log('Clicked completed');
    }
  }

  const handleAvatar3=()=>{
    console.log('Clicked')
    if (localStorage.getItem ('user') !== null) {
      const ls = JSON.parse (localStorage.getItem ('user')).email;
      db.collection ('Users')
        .doc (ls)
        .update({
          avatar:avatar3

        })
        .catch (function (error) {
          console.log ('Error getting document: ', error);
        });
        console.log('Clicked completed');
    }
  }

  const handleAvatar4=()=>{
    console.log('Clicked')
    if (localStorage.getItem ('user') !== null) {
      const ls = JSON.parse (localStorage.getItem ('user')).email;
      db.collection ('Users')
        .doc (ls)
        .update({
          avatar:avatar4

        })
        .catch (function (error) {
          console.log ('Error getting document: ', error);
        });
        console.log('Clicked completed');
    }
  }

  const handleAvatar5=()=>{
    console.log('Clicked')
    if (localStorage.getItem ('user') !== null) {
      const ls = JSON.parse (localStorage.getItem ('user')).email;
      db.collection ('Users')
        .doc (ls)
        .update({
          avatar:avatar5

        })
        .catch (function (error) {
          console.log ('Error getting document: ', error);
        });
        console.log('Clicked completed');
    }
  }

  const handleAvatar6=()=>{
    console.log('Clicked')
    if (localStorage.getItem ('user') !== null) {
      const ls = JSON.parse (localStorage.getItem ('user')).email;
      db.collection ('Users')
        .doc (ls)
        .update({
          avatar:avatar6

        })
        .catch (function (error) {
          console.log ('Error getting document: ', error);
        });
        console.log('Clicked completed');
    }
  }


  if (localStorage.getItem ('user') !== null) {
    const ls = JSON.parse (localStorage.getItem ('user')).email;
    db
      .collection ('Users')
      .doc (ls)
      .get ()
      .then (function (doc) {
        if (doc.exists) {
          var UserName = doc.data ().name;
          var avatarName=doc.data().avatar;
          var userPhone=doc.data().phone;
          console.log ('USERNAME', UserName);
          setUserName (UserName);
          setUserEmail (ls);
          setAvatar(avatarName);
          setUserPhone(userPhone);
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
                <img src={avatar} className="picture"/>
                <div className="avatar">
                  <div className="avatarHeading">AVATAR</div>
                  <div className="changedp">
                    <Button onClick={handleAvatar1}>
                      <Avatar
                        src={avatar1}
                        style={{
                          height: '45px',
                          width: '45px',
                          border: '1px solid black',
                        }}
                      />
                    </Button>
                    <Button onClick={handleAvatar2}>
                      <Avatar
                        src={avatar2}
                        style={{
                          height: '45px',
                          width: '45px',
                          border: '1px solid black',
                        }}
                      />
                    </Button>
                    <Button onClick={handleAvatar3}>
                      <Avatar
                        src={avatar3}
                        style={{
                          height: '45px',
                          width: '45px',
                          border: '1px solid black',
                        }}
                      />
                    </Button>
                    <Button onClick={handleAvatar4}>
                      <Avatar
                        src={avatar4}
                        style={{
                          height: '45px',
                          width: '45px',
                          border: '1px solid black',
                        }}
                      />
                    </Button>
                    <Button onClick={handleAvatar5}>
                      <Avatar
                        src={avatar5}
                        style={{
                          height: '45px',
                          width: '45px',
                          border: '1px solid black',
                        }}
                      />
                    </Button>
                    <Button onClick={handleAvatar6}>
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
                  <Button onClick={handleClose}>
                    Remove Image
                  </Button>
                </div>
              </div>
              <div className="information">
                <div className="profileInput">
                  <div className="profileHeading">My Profile</div>
                </div>
                <div className="profileInput">
                  <div className="profileSubTitle">
                    UserName
                  </div>
                  <div className="profileSubValue">
                    {userName}
                  </div>
                </div>
                <div className="profileInput">
                  <div className="profileSubTitle">
                    Email
                  </div>
                  <div className="profileSubValue">
                    {userEmail}
                  </div>
                </div>
                <div className="profileInput">
                  <div className="profileSubTitle">
                    Phone
                  </div>
                  <div className="profileSubValue">
                    {userPhone}
                  </div>
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
