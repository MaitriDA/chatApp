import { SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import fire from '../../helper/db';
import './ContactList.css';
import MyContacts from './MyContacts';


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
                        length:doc.data().chats.length,
                        lastmsg:doc.data().chats[doc.data().chats.length-1].message,
                        lastmsgTimeH:new Date(doc.data().chats[doc.data().chats.length-1].timestamp*1000).getHours(),
                        lastmsgTimeM:new Date(doc.data().chats[doc.data().chats.length-1].timestamp*1000).getMinutes()
                        
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
                        photo_url={Contact.data.photo_url}
                        lastmsg={Contact.lastmsg}
                        lastmsgTimeH={Contact.lastmsgTimeH}
                        lastmsgTimeM={Contact.lastmsgTimeM}
                    />
                ))}
            </div>
       </div>
       </>
    );

}
export default ContactList;