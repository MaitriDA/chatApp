import React from 'react';
import {AppBar,Toolbar,IconButton,Typography,MenuItem,makeStyles} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import './Home.css';
import fire from '../helper/db';
import { render } from '@testing-library/react';
import Practice from './Practice';
import Header from './Components/Header';
import IconPanel from './Components/IconPanel';
import MainArea from './Components/MainArea';
import PersonalSpace from './Components/PersonalSpace';
import Footer from './Components/Footer';

const Home=(props)=>{
    return(
        <div className="home">
        <div className="mainHome">
       <Header className="Header"/>
       <IconPanel/>
       <MainArea/>
       <PersonalSpace/>
       <Footer/>
       </div>
       </div>
    );

}
export default Home;