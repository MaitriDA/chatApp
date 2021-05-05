import React, {useState, useEffect} from 'react';
import {Button} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import fire from '../../helper/db';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Todo.css';
import { Description } from '@material-ui/icons';


const ToDoListCom = ({id,title,description,time,completed}) => {
    const db=fire.firestore();
    const classes = useStyles();
    const [checked, setChecked] = React.useState(completed);
    const [open, setOpen] = React.useState (false);
    const [toDoTitle, setToDoTitle] = useState("");
    const [toDoDescription, setToDoDescription] = useState("");

    var month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

    var TimeHour=new Date(time*1000).getHours()
    var TimeMinute=new Date(time*1000).getMinutes()
    var TimeMonth=month[new Date(time*1000).getMonth()]
    var TimeDate=new Date(time*1000).getDate()

    const handleChange = (event) => {
        setChecked(true);
        const userEmail = JSON.parse (localStorage.getItem ('user')).email;
        db.collection('Users')
        .doc(userEmail)
        .collection('To-Do')
        .doc(id)
        .update({
            task_completed:true
        })
      };
      const handleClickOpen = () => {
        setOpen (true);
      };
    
      const handleClose = () => {
        setOpen (false);
      };

      const handleDone = () => {
        const userEmail = JSON.parse (localStorage.getItem ('user')).email;
        if(toDoTitle==='' && toDoDescription===''){
            
                console.log('Yes')
            
            
        }
        else if(toDoTitle===''){
            console.log('Yes')
            db.collection('Users')
            .doc(userEmail)
            .collection('To-Do')
            .doc(id)
            .update({
                task_description:toDoDescription,
                task_time:new Date(),
            })
        }
        else if(toDoDescription==''){
            console.log('Yes')
            db.collection('Users')
            .doc(userEmail)
            .collection('To-Do')
            .doc(id)
            .update({
                task_title:toDoTitle,
                task_time:new Date(),
            })
        }
        else{
            console.log('Yes')
            db.collection('Users')
            .doc(userEmail)
            .collection('To-Do')
            .doc(id)
            .update({
                task_description:toDoDescription,
                task_title:toDoTitle,
                task_time:new Date(),
            })
        }
        setOpen (false);
      };
    return(
    
            <div>
            
                <div  className="btn">
                <div className="checkbox">
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedI"
                    />
                </div>
                <div className="content"  onClick={handleClickOpen}>
                <div className="todoComTitle">
                        {`${title.substring(0, 18)}`}
                    </div>
                    <div className="todoComDis">
                        {/* {completed ? "completed":"In progress"} */}
                        {`${description.substring(0, 25)}`}
                    </div>
                </div>
                </div>
                <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        
        maxWidth="xl"
      >
        <DialogContentText>
          <DialogContentText>
          
          <div className="dialog">
                  <div className="AddToDos">Edit To-dos..</div>

                    <div className="todoContentEdit">
                        <div className="contentItem">
                            <div className="contentHeading">Title: </div>
                            <div className="contectDes">{title}</div>
                        </div>

                        <div className="contentItem">
                            <div className="contentHeading">Desc: </div>
                            <div className="contectDes">{description}</div>
                        </div>

                        <div className="contentItem">
                            <div className="contentHeading">Time: </div>
                            <div className="contectDes">{TimeDate} {TimeMonth} | {TimeHour}:{TimeMinute}</div>
                        </div>  
                    </div>

                    <div className="Title">
                      <TextField
                        id="standard-basic"
                        label=" NewTitle"
                        style={{width: 300}}
                        onChange={e => setToDoTitle(e.target.value)}
                        type="text" 
                        placeholder="New Todo Title"
                      />
                    </div>
                    <div className="Description">
                      <TextField
                        id="standard-basic"
                        label="New Description"
                        style={{width: 300}}
                        onChange={e => setToDoDescription(e.target.value)}
                        type="text" 
                        placeholder="New Todo Description"
                      />
                    </div>
                    <div className="toDoBtn">
                    <Button type="submit" className={classes.submit} onClick={handleDone}>
                      Done
                    </Button>
                    <Button className={classes.submit} onClick={handleClose}>
                      Cancel
                    </Button>
                    </div>

                </div>


          </DialogContentText>
        </DialogContentText>
      </Dialog>
               
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    submit: {
        background: 'linear-gradient(45deg, #0c2637 30%, #0c2637 90%)',
        color: '#feefec',
    },
    custom:{
      width:'150px'
    }
  }));
export default ToDoListCom;