import {Avatar} from '@material-ui/core';
import React, {useState} from 'react';
import './MyContacts.css';
import fire from '../../helper/db';
import {BrowserRouter as Router} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import firebase from 'firebase/app';
import None from '../../avatar/None.jpg';
import avatar1 from '../../avatar/avatar1.jpg';
import avatar2 from '../../avatar/avatar2.jpg';
import avatar3 from '../../avatar/avatar3.jpg';
import avatar4 from '../../avatar/avatar4.jpg';
import avatar5 from '../../avatar/avatar5.jpg';
import avatar6 from '../../avatar/avatar6.jpg';

function MyContacts({key, id, name, photo_url, lastmsg,lastmsgTimeH,lastmsgTimeM,addNewContact}) {
  const db = fire.firestore ();
  const history = useHistory ();
  const [demo, setDemo] = useState ([]);
  const [email,setEmail]=useState('');
  const [userName, setUserName] = useState ('');
  const [avatar, setAvatar] = useState (None);

  const handleAvatar=(id)=>{
    db.collection('Users')
    .doc(id)
    .get()
    .then(function(doc){
      if(doc.exists){
        if(photo_url=='avatar1.jpg'){
          setAvatar(avatar1)
        }
        else if(photo_url=='avatar2.jpg'){
          setAvatar(avatar2)
        }
        else if(photo_url=='avatar3.jpg'){
          setAvatar(avatar3)
        }
        else if(photo_url=='avatar4.jpg'){
          setAvatar(avatar4)
        }
        else if(photo_url=='avatar5.jpg'){
          setAvatar(avatar5)
        }
        else if(photo_url=='avatar6.jpg'){
          setAvatar(avatar6)
        }
        else{
          setAvatar(None)
        }
      }
    })
  }
  const createContact = () => {
    
    db.collection ('Users')
    .doc ('allusers')
      .onSnapshot (snapshot => setDemo (snapshot.data ().names));
        const userEmail = JSON.parse (localStorage.getItem ('user')).email;
        db.collection('Users')
        .doc(userEmail)
        .get()
        .then(function(doc){
            if(doc.exists){
                setUserName(doc.data().name);
            }
        }).catch(function(error){
            console.log("Error getting document: ",error)
        });
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
                    email: email,
                    photo_url:"noprofile.png",
                });

            db.collection ('Users')
                .doc (email)
                .collection ('Chats')
                .doc (userEmail)
                .set ({
                    name: userName,
                    email: userEmail,
                    photo_url:"noprofile.png",
                });
            db.collection ('Users')
                .doc (userEmail)
                .collection ('Chats')
                .doc (email)
                .update ({
                    chats: firebase.firestore.FieldValue.arrayUnion ({
                        message: 'Hello from baatein team,',
                        sender: 'Team',
                        timestamp: new Date (),
                    }),
                });
                db.collection ('Users')
                .doc (userEmail)
                .collection ('Chats')
                .doc (email)
                .update ({
                    chats: firebase.firestore.FieldValue.arrayUnion ({
                        message: 'You can starting here',
                        sender: 'Team',
                        timestamp: new Date (),
                    }),
                });
                db.collection ('Users')
                .doc (email)
                .collection ('Chats')
                .doc (userEmail)
                .update ({
                    chats: firebase.firestore.FieldValue.arrayUnion ({
                        message: 'Hello from baatein team',
                        sender: 'Team',
                        timestamp: new Date (),
                    }),
                });
                db.collection ('Users')
                .doc (email)
                .collection ('Chats')
                .doc (userEmail)
                .update ({
                    chats: firebase.firestore.FieldValue.arrayUnion ({
                        message: 'You can starting here',
                        sender: 'Team',
                        timestamp: new Date (),
                    }),
                });
        } 
        else {
            alert ('User not found');
        }
    };

    const search = (email, contact) => {
        var i;
        for (i = 0; i < demo.length; i++) {
            if (demo[i] == contact) {
              return 'Yes';
        }
        }
    };
  return !addNewContact
    ? <Router>
        <div
          className="myContact"
          onClick={() => history.push (`/contact/${id}`)}
        >
          <Avatar src={avatar} onClick={handleAvatar(id)}/>
          <div className="myContactInfo">
            <div className="NameTime">
              <div className="myContactName">
                {name}
              </div>
              <div className="lastMsgTime">
                {lastmsgTimeH}:{lastmsgTimeM}
              </div>
            </div>
            <div className="myContactLastMsg">
            {`${lastmsg.substring(0, 15)}...`}
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
