import React, {useState} from 'react';
import {InfoRounded, Settings, SignalWifi1BarLock} from '@material-ui/icons';
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

import abhay from '../Icons/abhay.jpeg';
import Maitri from '../Icons/Maitri.jpeg';
import Asa from '../Icons/Asa.jpeg';
import Ruchika from '../Icons/Ruchika.jpeg';

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

            <div class="aboutUsMain">
              <div className="AboutUsPics">
                <font color="#0c2637">
                  <h2 className="Heading">Hello from team ‘BAATEIN’  !</h2>
                  <p className="Intro">
                    Hey there! We are so glad to see you :)
                    We are a team of self learned passionate developers who aspire to perk up ordinary apps and websites and revamp our users’ life!  As our name goes, we are here to have some ‘Baatein’ with you. Unlike other tangible chat applications available, ‘Baatein'’ not only brings about communication but also has a lot more in store. It is available on android devices as well as on the web, so you can find and access it whether you are on your desk or on the go!
                    {' '}
                  </p>

                  <br />
                  <h3 className="teamHeading">MEET US!</h3>
                </font>
                <div className="Pics">
                  <div className="Pictures">
                  <img
                    src={abhay}
                    alt="abhay's"
                    style={{
                      height: '70px',
                      width: '70px',
                      borderRadius: '50%',
                      border: '1px solid black',
                    }}
                  />

                  <img
                    src={Maitri}
                    alt="Maitri's pic"
                    style={{
                      height: '70px',
                      width: '70px',

                      borderRadius: '50%',
                      border: '1px solid black',
                    }}
                  />

                  <img
                    src={Asa}
                    alt="Asavari's pic"
                    style={{
                      height: '70px',
                      width: '70px',
                      borderRadius: '50%',
                      border: '1px solid black',
                    }}
                  />
                  <img
                    src={Ruchika}
                    alt="Ruchika's pic"
                    style={{
                      height: '70px',
                      width: '70px',
                      borderRadius: '50%',
                      border: '1px solid black',
                    }}
                  />
</div>
                  <div className="Names">
                    <h5>1)Abhay Ubhale</h5>
                    <h5>2)Maitri Amin</h5>
                    <h5>3)Asavari Ambavane</h5>
                    <h5>4)Ruchika Wadhwa</h5>
                  </div>
                </div>
              </div>
              <div className="Features">
                <font color="#0c2637">
                  <h3 className="featureHeading">Our key features include-</h3>
                  
                  
                  <p className="featureChat">
                  <b>1) Chatting with your friends: </b> Make the best of your time here with us with our beautiful UI and flawless user experience.Fast messaging on both website and app simmultaneously never looked so easy!Join us to streamline all your conversations and much more coming soon.
                    {' '}
                  </p>
                  
                  <p className="featureToDo">
                  <b>2) To-Do list:  </b>Tick off your editable ToDo list and make progress on your projects,assignments or any other tasks. Delete and edit them as you like it!Boost your prodictivity and organize your tasks in one place with 'Baatein'!
                  </p>
                  <br />
                  <h3>How do we aspire to grow?</h3>
                  <p className="Aspire">
                    Baatein may be the simplest of applications right now but we assure you a bright future of this application. We will be looking to implement group additional features like chats, peer to peer audio and video calling etc.Scheduling messages will also be a part of the future development process.Stay tuned!
                  </p>
                </font>
              </div>

              {}
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
