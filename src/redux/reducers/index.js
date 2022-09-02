import { combineReducers } from "@reduxjs/toolkit";
import User from "./UserReducer";
import Todo from "./TodoReducer";
export default combineReducers({
  Todo,
  User
});
