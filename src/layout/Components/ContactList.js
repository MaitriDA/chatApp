import { IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import fire from '../../helper/db';
import './ContactList.css';
import MyContacts from './MyContacts';

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
            db.collection('User')
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
    console.log(Contacts)
    return(
        <>
       <div className="mainContactList">
           <div className="contactListHeader">
                <div className="contactListTitle">My Contact</div>
                <SearchOutlined className="contactListSearchIcon"/>
            </div>
            <div className="contactListSearchBox">
                <input placeholder="Search" typr="text"/>
            </div>
            <div className="MyContact">
                <MyContacts addNewContact/>
                {Contacts.map(Contact=>(
                    <MyContacts 
                        key={Contact.id}    
                        id={Contact.id} 
                        name={Contact.data.name}/>
                ))}
            </div>
       </div>
       </>
    );

}
export default ContactList;