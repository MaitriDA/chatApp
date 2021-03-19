import { useEffect,useState } from 'react';
import './App.css';
import Login from './authentication/LoginIn';
import SignUp from './authentication/SignUp';
import GetStarted from './layout/GetStarted';
import Home from './layout/Home';

function App() {

  const [user,setUser]=useState('');
  const [toggleForm,setToggleForm]=useState(true);
  const formMode=()=>{
    setToggleForm(!toggleForm);
  }
  const userState=()=>{
    const data=localStorage.getItem('user');
    const us=data!==null ? JSON.parse(data):null;
    setUser(us);
  }
  useEffect(()=>{
    userState();
  },[]);
  return (
    <>
      {user !== null ? (
        <>
        <Home setUserState={() => setUser(null)}/>
        </>
      ) : (
         <>
         {toggleForm ? (<Login loggedIn={(user) => setUser(user)} toggle={() => formMode()}/>) 
         : ( <SignUp toggle={() => formMode()}/>)}
        
     </>
      )} 
    </>
   
  );
}

export default App;