import React, {useState, useEffect} from 'react';
import './Todo.css';
import AddIcon from '@material-ui/icons/Add';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import fire from '../../helper/db';
import ToDoListCom from './ToDoListCom';

const Todo = () => {
  const db=fire.firestore();
  const [open, setOpen] = React.useState (false);
  const classes = useStyles();
  const [toDoTitle, setToDoTitle] = useState("");
  const [toDoDescription, setToDoDescription] = useState("");
  const [todoFire,setTodoFire]=useState([]);

  const handleClickOpen = () => {
    setOpen (true);
  };

  const handleClose = () => {
    setOpen (false);
  };

  const handleDone = () => {
    if(localStorage.getItem('user')!==null){
      const userEmail = JSON.parse (localStorage.getItem ('user')).email;
    db.collection('Users')
    .doc(userEmail)
    .collection('To-Do')
    .add({
      task_title:toDoTitle,
      task_description:toDoDescription,
      task_completed:false,
      task_time:new Date(),
    })
    }
    
    setOpen (false);
  };
  
  useEffect(()=>{
    getTodos();
  },[])

  function getTodos(){
    if(localStorage.getItem('user')!==null){
      const userEmail = JSON.parse (localStorage.getItem ('user')).email;
    db.collection('Users')
      .doc(userEmail)
      .collection('To-Do')
      .onSnapshot(snapshot=>(
        setTodoFire(snapshot.docs.map((doc)=>({
          id: doc.id,
          title:doc.data().task_title,
          description:doc.data().task_description,
          completed:doc.data().task_completed,
          time:doc.data().task_time,
        })
      ))
    ))
    }
    
  }
  return (
    <div>
    <div className="todoHeader">
      <div className="TitleHeader">What To-Do ?</div>
      <Button onClick={handleClickOpen}>
          <AddIcon style={{fontSize: 30, color: 'black'}} className="addBtn"/>
        </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        
        maxWidth="xl"
      >
        <DialogContentText>
          <DialogContentText>
          <div className="dialog">
                  <div className="AddToDos">Add To-dos..</div>
              

                    <div className="Title">
                      <TextField
                        id="standard-basic"
                        label="Title"
                        style={{width: 300}}
                        onChange={e => setToDoTitle(e.target.value)}
                        type="text" 
                        placeholder="Todo Title"
                      />
                    </div>
                    <div className="Description">
                      <TextField
                        id="standard-basic"
                        label="Description"
                        style={{width: 300}}
                        onChange={e => setToDoDescription(e.target.value)}
                        type="text" 
                        placeholder="Todo Description"
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
    <div className="line"></div>
    <div className="todos">
      {todoFire.map((todo)=>(
        <ToDoListCom
          id={todo.id}
          title={todo.title}
          description={todo.description}
          time={todo.time}
          completed={todo.completed}
        />
        
      ))}
    </div>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  submit: {
      background: 'linear-gradient(45deg, #0c2637 30%, #0c2637 90%)',
      color: '#feefec',
  },
  custom:{
    width:'150px'
  }
}));
export default Todo;

