import React from 'react';
import fire from '../../helper/db';
import './Header.css';
import Logo from '../../images/logo.jpeg';

const Header=(props)=>{
    
    const db=fire.firestore();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [UserName,setUserName]=React.useState('');
    const [avatar,setAvatar]=React.useState('');
    const handleClose = () => {
        localStorage.removeItem('user');
        props.setUserState();
        setAnchorEl(null);
        window.history.pushState(null,window.location.href.match(/^.*\//),"/");
    }
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    if(localStorage.getItem('user')!==null){
        const ls=JSON.parse(localStorage.getItem("user")).email;
        db.collection('Users')
        .doc(ls)
        .get()
        .then(function(doc){
            if(doc.exists){
                var UserName=doc.data().name;
                setUserName(UserName);
            }
            else{
                console.log("No such Document found");
            }
        }).catch(function(error){
            console.log("Error getting document: ",error)
        });
    }
    return(
            <div className="mainHeader">
            <div className="Brand">
            <img src={Logo} className="logo"/>
                <div className="title">
                BAATEIN
                </div>
                </div>
                <div className="title UserName">Hello!! {UserName}</div>
                <div onClick={handleClose} className="logOut">
                LogOut
                </div>
            </div>
    );

}
export default Header;