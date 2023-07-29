import React , { useEffect } from 'react';
import './App.css';
import Todo from "./Components/Todo.js";
import {useDispatch} from "react-redux";
import { getTodosAsync } from './Redux/Reducers/TodoReducer';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);
  
  return (
    <div className="App">
      <p>Welcome</p>
      <Todo/>
    </div>
  )
};

export default App;
