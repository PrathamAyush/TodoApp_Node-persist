import React, { Fragment, useState, useEffect, } from "react";
import "./style.css"

const defaultField = { todo: ""}
function ToDoApp() {

  const [todoName, setTodoName] = useState(defaultField);
  const [toDoList, setTodoList] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  //To show date and time on todo App.
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
  }, []);

//To handle the POST Request to the server when form got submitted.
const handleSubmit = (e) => {

  e.preventDefault();
  const { todo } = todoName;

  try {
    fetch('http://localhost:3200/addTodo', {
      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({ todo })

    })
      .then((response) => {
        response.json()
      })

    setTodoName(defaultField);

    // Make a GET request to retrieve the updated data
    fetch('http://localhost:3200/getTodo')
      .then((response) => response.json())
      .then(data => {
        setTodoList(data.data);
      });

  } catch (err) {
    console.error(err.message);
  }
}


 // DELETE request when app restarts/reload 
useEffect(() => {
  fetch('http://localhost:3200/getTodo', {
    method: 'DELETE'
  })
    .then(() => {
      setTodoList([]);
    })
    .catch((err) => {
      console.error(err.message);
    });
}, []);

//JSX code for Showing UI to the user
  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>TO-DO List</h1>
        <span style={{ textAlign: "center", display: "block" }}> {currentTime}</span>
      </div>

      {/* Input Area Code */}
      <div className="todo-body">
        <form onSubmit={handleSubmit}>
          <span className="span-box">Enter The Task</span>
          <input className="input-style" type="text" name="todo" placeholder="Add item here!" required value={todoName.todo}
            onChange={(e) => setTodoName({ ...todoName, todo: e.target.value })} />
          <input className="btn-1" type="submit" value="Add" />
        </form>
      </div>

      {/* Output Area Code */}
      <div>
        <ul className="todoNames">
            {toDoList.map((storage) => (
              <li className="singleName" key={storage.id}>
                <span className="text-center">{storage.todo}</span>
              </li>
            ))}
          
        </ul>

      </div>

    </>
  )
}
export default ToDoApp;