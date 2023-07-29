import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos: []
};

export const getTodosAsync = createAsyncThunk("todos/getInitialState" , async()=>{
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos?userId=1");
    return res.data;
});

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync" , async(data)=>{
    const res = await axios.post(
        "https://jsonplaceholder.typicode.com/todos", 
        data,
        {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }
        )
    return res.data;
});

export const toggleCompletedAsync =  createAsyncThunk("todos/toggleCompletedAsync" , async(todo)=>{
    console.log(todo);
    const res = await axios.patch(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`, 
        {completed: !todo.completed},
        {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }
    )
    console.log(res.data);
    return res.data;

});

export const deleteTodoAsync = createAsyncThunk(
    "todos/deleteTodoAsync",
    async(id)=>{
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        return id;
    }
)

export const updateTodoAsync = createAsyncThunk(
    "todos/updateTodoAsync",
    async(todo)=>{
        const {data} = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}` , todo);
        return data;
    }
)

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getTodosAsync.fulfilled , (state , action)=>{
            state.todos = [...action.payload];
        })
        .addCase(addTodoAsync.fulfilled , ( state , action )=>{
            state.todos.unshift(action.payload);
        })
        .addCase(toggleCompletedAsync.fulfilled , (state , action)=>{
            const index = state.todos.findIndex((todo)=> todo.id === action.payload.id);
            state.todos[index]= action.payload;
        })
        .addCase(updateTodoAsync.fulfilled , (state , action)=>{
            const index = state.todos.findIndex((todo)=> todo.id === action.payload.id);
            state.todos[index]= action.payload;
        })
        .addCase(deleteTodoAsync.fulfilled , (state , action)=>{
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        })
    }
});

export const todosReducer = todosSlice.reducer;

export const todosSelector = (state)=> state.todosReducer;