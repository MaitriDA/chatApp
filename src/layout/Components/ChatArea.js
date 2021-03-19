import { Avatar } from '@material-ui/core';
import { DomainDisabled, InsertEmoticon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './ChatArea.css';
import fire from '../../helper/db';

function ChatArea(){
    const [input,setInput]=useState("");
    const {contactEmail}=useParams();
    const [contactName,setContactName]=useState('');
    const [messages,setMessages]=useState([]);
    const db=fire.firestore();
    const userEmail=JSON.parse(localStorage.getItem("user")).email;


    useEffect(()=>{
        if(contactEmail){
            db.collection('User')
            .doc(userEmail)
            .collection('Chats')
            .doc(contactEmail)
            .onSnapshot(snapshot=>(
                setContactName(snapshot.data().name)
            ))
            db.collection('User')
            .doc(userEmail)
            .collection('Chats')
            .doc(contactEmail)
            .collection('messages')
            .onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>
                    doc.data()))
            ))
        }
    },[contactEmail])

    const sendMessage=(e)=>{
        e.preventDefault();
        console.log('You typed>>',input);

        db.collection('User')
            .doc(userEmail)
            .collection('Chats')
            .doc(contactEmail)
            .collection('messages')
            .add({
                message:input,
                conatct:contactEmail,
                my:userEmail,
                
            })

        db.collection('User')
            .doc(contactEmail)
            .collection('Chats')
            .doc(userEmail)
            .collection('messages')
            .add({
                message:input,
                contact:contactEmail,
                my:userEmail,
                
            })

        setInput("");
    }
    console.log(contactEmail);

    return(
        <div className="mainChatArea">
            <div className="chatAreaHeader">
                <Avatar/>
                <div classNmae="chatAreaInfo">{contactName}</div>
            </div>
            <div className="chatAreaBody">
                {messages.map(message=>(

                <p className={`chatAreaMessages ${message.my!=contactEmail && 'chatAreaMessageMy'}`}>
                   {message.message}
                </p>
                ))}
            </div>
            <div className="chatAreaFooter">
                <InsertEmoticon/>
                <form>
                    <input 
                        value={input} 
                        onChange={e=>setInput(e.target.value)} 
                        type="text" placeholder="Type our message here"/>
                    <button 
                        onClick={sendMessage} 
                        type="submit">Send a Message</button>
                </form>
            </div>
        </div>

    )
}
export default ChatArea;