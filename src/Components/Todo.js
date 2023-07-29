import React , { useState } from "react";
import "./Todo.css";
import TodoList from "./TodoList";
import {useSelector , useDispatch} from "react-redux";
import { addTodoAsync, todosSelector } from "../Redux/Reducers/TodoReducer";

function Todo() {
  const { todos } = useSelector(todosSelector);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    let data = {
      id: todos.length + 1,
      userId: 1,
      title: text,
      completed: false
    };
    dispatch(addTodoAsync(data))
    .then(()=> setText(""));
  };


  return (
    <div className="container">
      <h1>To Do App</h1>
      <form className="my-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          placeholder="Enter task to add"
          style={{ width: "30rem", height: "2rem" }}
          id="task-input"
          onChange={(e)=> setText(e.target.value)}
          value={text}
          required
        />
        <button type="submit" style={{ width: "5rem", height: "2rem" }}>
          Add
        </button>
      </form>
      <ul className="d-flex align-items-center flex-column" id="list">
        {todos.map((todo , index)=>{
          return <TodoList key={index} todo={todo}/>
        })}
      </ul>
    </div>
  );
}

export default Todo;
