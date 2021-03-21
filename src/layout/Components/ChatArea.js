import { Avatar } from '@material-ui/core';
import { DomainDisabled, InsertEmoticon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './ChatArea.css';
import fire from '../../helper/db';
import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import avatar from '../../avatar/avatar4.png';


function ChatArea(){
    const [input,setInput]=useState("");
    const {contactEmail}=useParams();
    const [contactName,setContactName]=useState('');
    const [messages,setMessages]=useState([]);
    const db=fire.firestore();
    

    useEffect(()=>{
        if(localStorage.getItem('user')!==null){
            const userEmail=JSON.parse(localStorage.getItem("user")).email;

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
        }
        else{
            console.log('chat area error')
        }
    },[contactEmail])

    
    const sendMessage=(e)=>{
        e.preventDefault();
        console.log('You typed>>',input);
        if(localStorage.getItem('user')!==null){
            const userEmail=JSON.parse(localStorage.getItem("user")).email;
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
        else{
            console.log('chat area error');
        }
        console.log(contactEmail);
    }

    return(
        <div className="mainChatArea">
            <div className="chatAreaHeader">
                <div className="chatAreaContactName">
                    <Avatar src={avatar}/>
                    <div className="chatName">
                        <div classNmae="chatAreaInfo">{contactName}</div>
                    </div>
                </div>
            </div>
            <div className="chatAreaBody">
                {messages.map(message=>(

                <p className={`chatAreaMessages  ${message.my==contactEmail && 'chatAreaMessageReceiver'} ${message.my!=contactEmail && 'chatAreaMessageMy'}`}>
                   {message.message}
                </p>
                ))}
            </div>
            <div className="chatAreaFooter">
                <div className="sendMessageArea">
                    <Button>
                        <ImageIcon style={{fontSize:25,color:"#0c2637"}}/>
                    </Button>
                    <form className="formSendMessage">
                        <input 
                            value={input} 
                            onChange={e=>setInput(e.target.value)} 
                            type="text" placeholder="Send a Message..." className="sendMessage"/>
                        <Button 
                            onClick={sendMessage} 
                            type="submit"><SendIcon style={{fontSize:28,color:"#0c2637"}}/></Button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default ChatArea;