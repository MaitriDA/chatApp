import React, {useState, useEffect} from 'react';
import Item from './Item';
import './Todo.css';
import AddIcon from '@material-ui/icons/Add';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


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

  return (
    <div className="container">
      {' '}
      <div className="body">
        {' '}
        <h3>What To-Do?</h3>
        <div className="todo-form">
          {' '}
          <form onSubmit={handleSubmit} className="inputButton">
            <div className="inputField">
              <div className="inputText">
                <input
                  className="inputTitleDes"
                  placeholder="Title"
                  type="text"
                  value={todo}
                  name="todo"
                  onChange={handleChange}
                />
                <input
                  className="inputTitleDes"
                  placeholder="Description"
                  type="text"
                  value={todo}
                  name="todo"
                />
              </div>
              <button type="submit" className="AddButton">
                <AddIcon style={{fontSize:40}} />
              </button>
            </div>
          </form>
        </div>
        <div>
          {todos.length > 0
            ? <div className="todo-box">
                <h3>To-Do list</h3>
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
}));
export default Todo;
