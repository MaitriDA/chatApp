import React from 'react';
import Vector from '../images/Vector2.jpg';
import './GetStarted.css';

const GetStarted=()=>{
    return(
        <div>
            <img src={Vector} className="image"/>
            <div className="titlegs">
            <div className="textTitle">BAATEIN</div>
            <div className="textMsg">Welcome, we are glad to see you :)</div>
            <div className="buttonCon">
                <button className="GSBtn">LOGIN</button>
            </div>
            </div>
        </div>
    )
}

export default GetStarted;