import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './ChatArea.css';
import fire from '../../helper/db';
import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase/app';

function ChatArea() {
    const [input, setInput] = useState("");
    const { contactEmail } = useParams();
    const [contactName, setContactName] = useState('');
    const [messages, setMessages] = useState([]);
    const db = fire.firestore();
    const [useremail,setUserEmail]=useState("");
    const userEmail = JSON.parse(localStorage.getItem("user")).email;
    useEffect(async () => {
        // if (localStorage.getItem('user') !== null) {
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
    }, [contactEmail])
    const sendMessage = async (e) => {
        e.preventDefault();
        if (localStorage.getItem('user') !== null) {
            const userEmail = JSON.parse(localStorage.getItem("user")).email;
            setUserEmail(userEmail);
            db.collection('Users')
                .doc(userEmail)
                .collection('Chats')
                .doc(contactEmail)
                .update({
                    "chats": firebase.firestore.FieldValue.arrayUnion(
                        {
                            "message": input,
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
    }
    
    const createMessagesBubble = (snapshot) => {
        var messages = snapshot.data();
        var chatAreaBody = document.getElementById("chatAreaBody");
        chatAreaBody.innerHTML = "";
        messages.chats.forEach(message => {
            var bubble = document.createElement("div");
            bubble.className = `${message.sender == userEmail && 'chatAreaMessageMy chatAreaMessages'} ${message.sender != userEmail && message.sender!='Team' && 'chatAreaMessageReceiver chatAreaMessages'} ${message.sender == 'Team' && 'team'}`;
            chatAreaBody.appendChild(bubble)
            bubble.innerText = message.message;
            chatAreaBody.appendChild(bubble)

            if(message.sender!='Team'){
                const monthA=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            var date=new Date(message.timestamp*1000).getDate();
            var monthD=new Date(message.timestamp*1000).getMonth();
            var timeH=new Date(message.timestamp*1000).getHours();
            var timeM=new Date(message.timestamp*1000).getMinutes();
            var bubbleTime=document.createElement("div");
            bubbleTime.className=`chatAreaMessages  ${message.sender == userEmail && 'timeChatAreaMessageMy'} ${message.sender != userEmail && 'timeChatAreaMessageReceiver'} ${message.sender == 'Team' && 'team'}`;
            bubbleTime.innerText=`${date} ${monthA[monthD]}  ${timeH}:${timeM}`;
            chatAreaBody.appendChild(bubbleTime);
            }
            

            setInput("");
        })
    }

    return (
        <div className="mainChatArea">
            <div className="chatAreaHeader">
                <div className="chatAreaContactName">
                    <div className="chatName">
                        <div classNmae="chatAreaInfo">{contactName}</div>
                    </div>
                </div>
            </div>
            <div className="chatAreaBody" id="chatAreaBody">
            </div>
            <div className="chatAreaFooter">
                <div className="sendMessageArea">
                    <Button>
                        <ImageIcon style={{ fontSize: 25, color: "#0c2637" }} />
                    </Button>
                    <form className="formSendMessage">
                        <textarea
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