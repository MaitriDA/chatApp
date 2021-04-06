import React, {useState, useEffect} from 'react';
import Item from './Item';
import './Todo.css';
import AddIcon from '@material-ui/icons/Add';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';

const Todo = () => {
  const [todos, setTodos] = useState ([]);

  const [todo, setTodo] = useState ('');
  const classes = useStyles ();

  useEffect (() => {
    if (localStorage.items) {
      setTodos (JSON.parse (localStorage.getItem ('items')));
    } else {
      setTodos ([]);
    }
  }, []);
  const handleChange = e => {
    setTodo (e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault ();
    if (todo === '') {
      return;
    }
    let todoObject = {
      id: todos.length + 1,
      task: todo,
      completed: false,
    };
    localStorage.setItem ('items', JSON.stringify ([...todos, todoObject]));
    setTodos ([...todos, todoObject]);
    setTodo ('');
  };

  const completedTodo = index => {
    const newList = todos.map (list => {
      if (list.id === index) {
        list.completed = !list.completed;
      }

      return list;
    });
    localStorage.setItem ('items', JSON.stringify (newList));
    setTodos (newList);
  };

  const [open, setOpen] = React.useState (false);
  const handleClickOpen = () => {
    setOpen (true);
  };

  const handleClose = () => {
    setOpen (false);
  };

  return (
    <div className="container">

      <div className="body">

        <div className="todo-form">

          <div className="todoFlex">
            <div className="todoTitle">
              What To-Do ?
            </div>
            <div>
              <Button onClick={handleClickOpen}>
                <AddIcon style={{fontSize: 35, color: 'black'}} />
              </Button>
            </div>
          </div>
            <div className="line"></div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <DialogContentText>
                <div className="dialog">
                  <div>Add To-dos..</div>
                  <form onSubmit={handleSubmit}>

                    <div className="Title">
                      <TextField
                        id="standard-basic"
                        label="Title"
                        style={{width: 270}}
                        type="text"
                        value={todo}
                        name="todo"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="Description">
                      <TextField
                        id="standard-basic"
                        label="Description"
                        style={{width: 270}}
                      />
                    </div>
                    <div className="toDoBtn">
                    <Button type="submit" className={classes.submit} onClick={handleClose}>
                      Done
                    </Button>
                    <Button className={classes.submit} onClick={handleClose}>
                      Cancel
                    </Button>
                    </div>
                  </form>

                </div>
                
              </DialogContentText>
            </DialogContent>
          </Dialog>

        </div>
        <div>
          {todos.length > 0
            ? <div className="todo-box">

                {todos.map (todoItem => {
                  return (
                    <Item
                      todoItem={todoItem}
                      completedTodo={completedTodo}
                      setTodos={setTodos}
                      todos={todos}
                      key={todoItem.id}
                    />
                  );
                })}
              </div>
            : <div>You have no todos</div>}
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles (theme => ({
  margin: {
    margin: theme.spacing (1),
  },
  add: {
    margin: theme.spacing (1),
    background: 'linear-gradient(45deg, #0c2637 30%, #0c2637 90%)',
    color: '#feefec',
    width: '100px',
  },
  submit: {
    background: 'linear-gradient(45deg, #0c2637 30%, #0c2637 90%)',
    color: '#feefec',
    width: '100px',
},
}));
export default Todo;

