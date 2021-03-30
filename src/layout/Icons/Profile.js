import React, { useState } from 'react';
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
import fire from '../../helper/db';


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

  const db=fire.firestore();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  
  
    if(localStorage.getItem('user')!==null){
      const ls=JSON.parse(localStorage.getItem("user")).email;
      db.collection('User')
      .doc(ls)
      .get()
      .then(function(doc){
          if(doc.exists){
              var UserName=doc.data().name;
              console.log('USERNAME',UserName);
              setUserName(UserName);
              setUserEmail(ls);
          }
          else{
              console.log("No such Document found");
          }
      }).catch(function(error){
          console.log("Error getting document: ",error)
      });
    }

  
  return (
    <div>
      <LightTooltip title="My Profile" placement="right">
        <Button onClick={handleClickOpen}>
          <PersonIcon style={{ fontSize: 35, color: "white" }} />
        </Button>
      </LightTooltip>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title" 
        fullWidth
        maxWidth="sm">
        <DialogContent>
          <DialogContentText>
            <div>My Profile</div>
            <div className="profileMain">
              <div className="profilePicture">
                <div className="picture">hello</div>
                <div className="changedp">
                changedp
                </div>
              </div>
              <div className="information">
                <div className="profileInput">
                  <TextField
                    id="filled-margin-normal"
                    style={{ width: 270 }}
                    label="User Name"
                    fullwidth multiline="true"
                    placeholder="Enter the User Name"
                    value={userName}
                    
                  />
                </div>
                <div className="profileInput">

                  <TextField
                    id="filled-margin-normal"
                    style={{ width: 270 }}
                    label="Email"
                    fullwidth multiline="true"
                    placeholder="Enter the email"
                    value={userEmail}
                  />
                </div>
                <div className="profileInput">

                  <TextField
                    id="filled-margin-normal"
                    style={{ width: 270 }}
                    label="About Me"
                    fullwidth multiline="true"
                    placeholder="Enter the Bio"
                  />
                </div>
                <div className="profileInput">

                  <TextField
                    id="filled-margin-normal"
                    style={{ width: 270 }}
                    label="Contact Number"
                    fullwidth multiline="true"
                    placeholder="Enter the Mobile Number"
                  />
                </div>
                
              </div>
            </div>
            

          </DialogContentText>
        </DialogContent>
        <div className="profileButton">
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