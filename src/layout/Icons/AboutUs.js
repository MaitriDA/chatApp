import React, {useState} from 'react';
import {InfoRounded, Settings} from '@material-ui/icons';
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
import './AboutUs.css';
import fire from '../../helper/db';
import {Avatar} from '@material-ui/core';

import None from '../../avatar/None.jpg';
import avatar1 from '../../avatar/avatar1.jpg';
import avatar2 from '../../avatar/avatar2.jpg';
import avatar3 from '../../avatar/avatar3.jpg';
import avatar4 from '../../avatar/avatar4.jpg';
import avatar5 from '../../avatar/avatar5.jpg';
import avatar6 from '../../avatar/avatar6.jpg';

export default function AboutUs () {
  const avatarLst = ['None', 'avatar1'];
  const [open, setOpen] = React.useState (false);
  const classes = useStyles ();

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
  const [avatar, setAvatar] = useState ('None');

  const handleAvatar1 = () => {
    console.log ('Clicked');
    if (localStorage.getItem ('user') !== null) {
      const ls = JSON.parse (localStorage.getItem ('user')).email;
      db
        .collection ('Users')
        .doc (ls)
        .set ({
          name: userName,
          email: userEmail,
          avatar: avatar1,
        })
        .catch (function (error) {
          console.log ('Error getting document: ', error);
        });
      console.log ('Clicked completed');
    }
  };

  const handleAvatar2 = () => {
    console.log ('Clicked');
    if (localStorage.getItem ('user') !== null) {
      const ls = JSON.parse (localStorage.getItem ('user')).email;
      db
        .collection ('Users')
        .doc (ls)
        .set ({
          name: userName,
          email: userEmail,
          avatar: avatar2,
        })
        .catch (function (error) {
          console.log ('Error getting document: ', error);
        });
      console.log ('Clicked completed');
    }
  };

  const handleAvatar3 = () => {
    console.log ('Clicked');
    if (localStorage.getItem ('user') !== null) {
      const ls = JSON.parse (localStorage.getItem ('user')).email;
      db
        .collection ('Users')
        .doc (ls)
        .set ({
          name: userName,
          email: userEmail,
          avatar: avatar3,
        })
        .catch (function (error) {
          console.log ('Error getting document: ', error);
        });
      console.log ('Clicked completed');
    }
  };

  const handleAvatar4 = () => {
    console.log ('Clicked');
    if (localStorage.getItem ('user') !== null) {
      const ls = JSON.parse (localStorage.getItem ('user')).email;
      db
        .collection ('Users')
        .doc (ls)
        .set ({
          name: userName,
          email: userEmail,
          avatar: avatar4,
        })
        .catch (function (error) {
          console.log ('Error getting document: ', error);
        });
      console.log ('Clicked completed');
    }
  };

  const handleAvatar5 = () => {
    console.log ('Clicked');
    if (localStorage.getItem ('user') !== null) {
      const ls = JSON.parse (localStorage.getItem ('user')).email;
      db
        .collection ('Users')
        .doc (ls)
        .set ({
          name: userName,
          email: userEmail,
          avatar: avatar5,
        })
        .catch (function (error) {
          console.log ('Error getting document: ', error);
        });
      console.log ('Clicked completed');
    }
  };

  const handleAvatar6 = () => {
    console.log ('Clicked');
    if (localStorage.getItem ('user') !== null) {
      const ls = JSON.parse (localStorage.getItem ('user')).email;
      db
        .collection ('Users')
        .doc (ls)
        .set ({
          name: userName,
          email: userEmail,
          avatar: avatar6,
        })
        .catch (function (error) {
          console.log ('Error getting document: ', error);
        });
      console.log ('Clicked completed');
    }
  };

  if (localStorage.getItem ('user') !== null) {
    const ls = JSON.parse (localStorage.getItem ('user')).email;
    db
      .collection ('Users')
      .doc (ls)
      .get ()
      .then (function (doc) {
        if (doc.exists) {
          var UserName = doc.data ().name;
          var avatarName = doc.data ().avatar;
          console.log ('USERNAME', UserName);
          setUserName (UserName);
          setUserEmail (ls);
          setAvatar (avatarName);
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
      <LightTooltip title="About Us" placement="right">
        <Button onClick={handleClickOpen}>
          <InfoRounded style={{fontSize: 35, color: 'white'}} />
        </Button>
      </LightTooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogContent style={{backgroundColor: '#feefec'}}>
          <DialogContentText
            style={{backgroundColor: 'white', borderRadius: '7px'}}
          >
            <div className="aboutUsMain">
              <font color="#0c2637">
                <h2>Hello from team ‘BAATEIN’ !</h2>
                <p>
                  Hey there! We are so glad to see you :)
                  We are a team of self learned passionate developers who aspire to perk up ordinary apps and websites and revamp our users’ life!  As our name goes, we are here to have some ‘Baatein’ with you. Unlike other tangible chat applications available, ‘Baatein'’ not only brings about communication but also has a lot more in store. It is available on android devices as well as on the web, so you can find and access it whether you are on your desk or on the go!
                </p>
                <br />
                <h3>Our key features include-</h3>
                <h4><b>Chatting with your friends.</b></h4>
                <p>
                  Make the best of your time here with us with our beautiful UI and flawless user experience.
                  {' '}
                </p>
                <h4><b>To-Do list</b></h4>
                <p>
                  Tick off your
                  {' '}
                  <b>editable</b>
                  {' '}
                  ToDo list and make progress on your projects,assignments or any other tasks. Delete and edit them as you like it!
                </p>
                <h4><b>Schedule your messages:</b></h4>
                <p>
                  Boost your productivity, stay organized and streamline all your conversations. This feature helps sending messages at the time you have scheduled beforehand. Also to make sure you don't forget to wish people on their birthdays ;)
                </p>
                <br />
                <h3>How do we aspire to grow?</h3>
                <p>
                  Baatein may be the simplest of applications right now but we assure you a bright future of this application. We will be looking to implement group additional features like chats, peer to peer audio and video calling etc.
                </p>
              </font>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles (theme => ({
  submit: {
    background: 'linear-gradient(45deg, #0c2637 30%, #0c2637 90%)',
    color: '#feefec',
  },
  custom: {
    width: '150px',
  },
}));
