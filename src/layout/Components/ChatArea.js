import { Avatar } from '@material-ui/core';
import { DomainDisabled, InsertEmoticon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './ChatArea.css';
import fire from '../../helper/db';
import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';

import avatar1 from '../../avatar/avatar1.jpg';
import avatar2 from '../../avatar/avatar2.jpg';
import avatar3 from '../../avatar/avatar3.jpg';
import avatar4 from '../../avatar/avatar4.jpg';
import avatar5 from '../../avatar/avatar5.jpg';
import avatar6 from '../../avatar/avatar6.jpg';
import firebase from 'firebase/app';

function ChatArea() {
    const [input, setInput] = useState("");
    const { contactEmail } = useParams();
    const [contactName, setContactName] = useState('');
    const [messages, setMessages] = useState([]);
    const db = fire.firestore();


    useEffect(async () => {
        if (localStorage.getItem('user') !== null) {
            const userEmail = JSON.parse(localStorage.getItem("user")).email;

            if (contactEmail) {
                db.collection('Users')
                    .doc(userEmail)
                    .collection('Chats')
                    .doc(contactEmail)
                    .onSnapshot(snapshot => (
                        setContactName(snapshot.data().name)
                    ));
                db.collection('Users')
                    .doc(userEmail)
                    .collection('Chats')
                    .doc(contactEmail)
                    .onSnapshot(snapshot => (
                        createMessagesBubble(snapshot)
                    ))
            }
        }

        else {
            console.log('chat area error')
        }
    }, [contactEmail])

    console.log(messages)
    const sendMessage = async (e) => {
        e.preventDefault();
        console.log('You typed>>', input);
        if (localStorage.getItem('user') !== null) {
            const userEmail = JSON.parse(localStorage.getItem("user")).email;
            db.collection('Users')
                .doc(userEmail)
                .collection('Chats')
                .doc(contactEmail)
                .update({
                    "chats": firebase.firestore.FieldValue.arrayUnion(
                        {
                            "message": input,
                            "receiver": contactEmail,
                            "sender": userEmail,
                            "timestamp": new Date(),
                        }
                    )

                })

            db.collection('Users')
                .doc(contactEmail)
                .collection('Chats')
                .doc(userEmail)
                .update({
                    "chats": firebase.firestore.FieldValue.arrayUnion(
                        {
                            "message": input,
                            "receiver": contactEmail,
                            "sender": userEmail,
                            "timestamp": new Date(),
                        }
                    )

                })

            setInput("");
        }
        else {
            console.log('chat area error');
        }
        console.log(contactEmail);
    }

    const createMessagesBubble = (snapshot) => {
        var messages = snapshot.data();
        console.log(messages);
        var chatAreaBody = document.getElementById("chatAreaBody");
        chatAreaBody.innerHTML = "";
        messages.chats.forEach(message => {
            var bubble = document.createElement("p");
            // if(message.sender == userEmail){
            //     bubble.className = "align-left";
            // }
            bubble.className = `chatAreaMessages  ${message.sender == contactEmail && 'chatAreaMessageReceiver'} ${message.sender != contactEmail && 'chatAreaMessageMy'}`;
            bubble.innerText = message.message;
            chatAreaBody.appendChild(bubble);
            setInput("");
        })
        // var chatAreaBody = document.getElementById("chatAreaBody");
        // chatAreaBody.innerText = messages.chats[0].message;
    }

    return (
        <div className="mainChatArea">
            <div className="chatAreaHeader">
                <div className="chatAreaContactName">
                    <Avatar src={avatar2} />
                    <div className="chatName">
                        <div classNmae="chatAreaInfo">{contactName}</div>
                    </div>
                </div>
            </div>
            <div className="chatAreaBody" id="chatAreaBody">

                {/* <p className={`chatAreaMessages  ${message.sender == contactEmail && 'chatAreaMessageReceiver'} ${message.sender != contactEmail && 'chatAreaMessageMy'}`}>
                        First Sample Message
                    </p> */}
            </div>
            <div className="chatAreaFooter">
                <div className="sendMessageArea">
                    <Button>
                        <ImageIcon style={{ fontSize: 25, color: "#0c2637" }} />
                    </Button>
                    <form className="formSendMessage">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            type="text" placeholder="Send a Message..." className="sendMessage" />
                        <Button
                            onClick={sendMessage}
                            type="submit"><SendIcon style={{ fontSize: 28, color: "#0c2637" }} /></Button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default ChatArea;