import React , {useState} from "react";
import {useDispatch} from "react-redux";
import { deleteTodoAsync, toggleCompletedAsync, updateTodoAsync } from "../Redux/Reducers/TodoReducer";

function TodoList({todo}) {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [editedTodo, setEditedTodo] = useState({});
    const handleSaveChanges = (todo)=>{
        if(edit){
            dispatch(updateTodoAsync(todo))
            .then(()=> setEdit(false));
        }
    }

  return (
    <li
      className="d-flex justify-content-between align-items-center"
    >
      <input
        className="form-check-input check-box"
        type="checkbox"
        style={{ fontSize: "1.2rem", margin: "0 0.7rem 0 0" }}
        checked={todo.completed}
        onChange={() => {
          dispatch(toggleCompletedAsync(todo));
        }}
      />
      <div className="info" style={{ width: "21rem", position: "relative" , textAlign: "initial" }}>
        {edit ? (
          <input type="text" value={editedTodo.title} onChange={(e)=>{setEditedTodo({...todo , title: e.target.value})
        }}/>
        ) : (
          <p className="inp">{todo.title}</p>
        )}
      </div>
      <i
        className="bi bi-pencil-square edit"
        title="Edit"
        onClick={() => {
            setEdit(!edit)
            setEditedTodo(todo);
        }}
      ></i>
      <i className="bi bi-clipboard-check save" title="Save" onClick={()=>handleSaveChanges(editedTodo)}></i>
      <i
        className="bi bi-trash3 delete"
        title="Delete"
        onClick={() => dispatch(deleteTodoAsync(todo.id))}
      ></i>
    </li>
  );
}

export default TodoList;
