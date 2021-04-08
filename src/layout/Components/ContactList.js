import { IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import fire from '../../helper/db';
import './ContactList.css';
import MyContacts from './MyContacts';
import {Avatar} from '@material-ui/core';

import None from '../../avatar/None.jpg';
import avatar1 from '../../avatar/avatar1.jpg';
import avatar2 from '../../avatar/avatar2.jpg';
import avatar3 from '../../avatar/avatar3.jpg';
import avatar4 from '../../avatar/avatar4.jpg';
import avatar5 from '../../avatar/avatar5.jpg';
import avatar6 from '../../avatar/avatar6.jpg';


//'Constcts' stores the array of contacts(email,name,etc) of the logged in user.
//'userEmail' is the email of the user who is currently logged in. This email is fetched from the local Storage
//'setContact' sets the array in the 'Contacts' this is .
// The database is accessed through userEmail to get only the contact of the logged in user.
const ContactList=(props)=>{
    const [Contacts,setContact]=useState([]);
    useEffect(()=>{
        if(localStorage.getItem('user')!==null){
            const userEmail=JSON.parse(localStorage.getItem("user")).email;
            const db=fire.firestore();
            db.collection('Users')
            .doc(userEmail)
            .collection('Chats')
            .onSnapshot(snapshot=>(
                setContact(snapshot.docs.map((doc)=>
                    ({
                        id: doc.id,
                        data:doc.data(),
                    })
                ))
            ))
        }
        else{
            console.log('Error');
        }
    },[])
    return(
        <>
       <div className="mainContactList">
           <div className="contactListHeader">
                <div className="contactListTitle">Chats</div>
                <SearchOutlined style={{fontSize:30}}className="contactListSearchIcon"/>
            </div>
            <div className="MyContact">
                {Contacts.map(Contact=>(
                    <MyContacts 
                        key={Contact.id}    
                        id={Contact.id} 
                        name={Contact.data.name}
                    />
                ))}
            </div>
       </div>
       </>
    );

}
export default ContactList;