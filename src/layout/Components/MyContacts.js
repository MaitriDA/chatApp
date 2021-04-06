import {Avatar} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import './MyContacts.css';
import fire from '../../helper/db';
import {BrowserRouter as Router} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import firebase from 'firebase/app';
import avatar1 from '../../avatar/avatar1.jpg';
import avatar2 from '../../avatar/avatar2.jpg';
import avatar3 from '../../avatar/avatar3.jpg';
import avatar4 from '../../avatar/avatar4.jpg';
import avatar5 from '../../avatar/avatar5.jpg';
import avatar6 from '../../avatar/avatar6.jpg';
import {KitchenTwoTone} from '@material-ui/icons';
import {set} from 'shelljs';

function MyContacts({key, id, name, addNewContact}) {
  const db = fire.firestore ();
  const history = useHistory ();
  const [demo, setDemo] = useState ([]);
  const [email, setEmail] = useState ();
  const [userName, setUserName] = useState ();

  const createContact = () => {
    db
      .collection ('Users')
      .doc ('allusers')
      .onSnapshot (snapshot => setDemo (snapshot.data ().emails));
        const userEmail = JSON.parse (localStorage.getItem ('user')).email;
        const contact = prompt ('Please Enter name');
        const email = prompt ('Please enter his email');
        setEmail (email);
        setUserName (contact);
        var checkAns = search (email, contact);
        if (checkAns == 'Yes') {
            alert ('Email is present');
            db.collection ('Users')
                .doc (userEmail)
                .collection ('Chats')
                .doc (email)
                .set ({
                    name: contact,
                });
            db.collection ('Users')
                .doc (userEmail)
                .collection ('Chats')
                .doc (email)
                .update ({
                    chats: firebase.firestore.FieldValue.arrayUnion ({
                        message: ' ',
                        sender: userEmail,
                        timestamp: new Date (),
                    }),
                });
        } 
        else {
            alert ('User not found');
        }
    };

    const search = (email, contact) => {
        console.log ('Yes');
        console.log (demo);
        console.log (demo.length);
        var i;
        for (i = 0; i < demo.length; i++) {
            if (demo[i] == email) {
            console.log ('Yes');
            return 'Yes';
        }
        }
    };
    const [avatar, setAvatar] = useState ('None');
    if (localStorage.getItem ('user') !== null) {
        const ls = JSON.parse (localStorage.getItem ('user')).email;
        db.collection ('Users')
            .doc (ls)
            .get ()
            .then (function (doc) {
                if (doc.exists) {
                    var avatarName = doc.data ().avatar;
                    setAvatar (avatarName);
                } 
                else {
                    console.log ('No such Document found');
                }
            })
            .catch (function (error) {
                console.log ('Error getting document: ', error);
            });
    }

  return !addNewContact
    ? <Router>
        <div
          className="myContact"
          onClick={() => history.push (`/contact/${id}`)}
        >
          <Avatar src={avatar} />
          <div className="myContactInfo">
            <div className="NameTime">
              <div className="myContactName">
                {name}
              </div>
              <div className="lastMsgTime">
                Time
              </div>
            </div>
            <div className="myContactLastMsg">
              Last Message
            </div>
          </div>

        </div>
      </Router>
    : <div onClick={createContact}>
        {/* <div onClick={searhContact}>  */}
        <PersonAddIcon addNewContact style={{fontSize: 33, color: 'white'}} />
      </div>;
}

export default MyContacts;
