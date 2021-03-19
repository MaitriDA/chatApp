import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './MyContacts.css';
import fire from '../../helper/db';
import { BrowserRouter as Router } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import avatar from '../../avatar/avatar4.png';

function MyContacts({ key, id, name, addNewContact }) {

    const db = fire.firestore();
    const history = useHistory();

    const CreateContact = () => {
        const userEmail = JSON.parse(localStorage.getItem("user")).email;
        const contact = prompt("Please Enter name");
        const email = prompt("Please enter his email");
        console.log(email)
        console.log(userEmail)
        if (contact) {
            if (email) {
                db.collection('User')
                    .doc(userEmail)
                    .collection('Chats')
                    .doc(email)
                    .set({
                        name: contact
                    })
            }
        }

    };

    return !addNewContact ? (
        <Router>
            <div className="myContact" onClick={() => history.push(`/contact/${id}`)}>
                <Avatar src={avatar}/>
                <div className="myContactInfo">
                    <div className="myContactName">
                        {name}
                    </div>
                </div>
                
            </div>
        </Router>
    ) : (
        <div onClick={CreateContact}>
            <PersonAddIcon addNewContact style={{fontSize:33,color:"white"}}/>
        </div>
    )
}


export default MyContacts;