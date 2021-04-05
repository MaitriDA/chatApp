import React from 'react';
import fire from '../../helper/db';
import './PersonalSpace.css';
import Todo from "../todoList/Todo";

const PersonalSpace=(props)=>{
    return(
       <div className="mainPersonalSpace">
       <Todo/>
       </div>
    );

}
export default PersonalSpace;