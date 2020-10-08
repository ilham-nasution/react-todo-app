import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { todoReducer } from "./todo";

const rootReducers = combineReducers({
  authReducer,
  todoReducer,
});

export default rootReducers;
