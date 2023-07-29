import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./Reducers/TodoReducer";

export const store = configureStore({
    reducer: {
        todosReducer
    }
});