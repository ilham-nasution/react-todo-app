import {
  fetchTodoListFailure,
  fetchTodoListRequest,
  fetchTodoListSuccess,
  addTodo,
  deleteTodo,
  isDone,
} from "../actions";
import axios from "axios";
import produce from "immer";

const todoListState = {
  loading: false,
  todoList: [],
  error: "",
};

export const todoReducer = produce((draft, action) => {
  switch (action.type) {
    case "FETCH_TODO_LIST_REQUEST":
      draft.loading = true;
      return;
    case "FETCH_TODO_LIST_SUCCESS":
      draft.todoList = action.payload;
      return;
    case "FETCH_TODO_LIST_FAILURE":
      draft.error = action.payload;
      return;
    case "ADD_TODO":
      draft.todoList.push(action.payload);
      return;
    case "DELETE_TODO":
      const deletedId = draft.todoList.findIndex(
        (todo) => todo.id === action.payload
      );
      draft.todoList.splice(deletedId, 1);
      return;
    case "DONE_TODO":
      const isDoneId = draft.todoList.findIndex(
        (todo) => todo.id === action.payload
      );
      draft.todoList[isDoneId].completed = true;
      return;

    default:
      return;
  }
}, todoListState);

export const fetchTodoList = (id) => (dispatch) => {
  dispatch(fetchTodoListRequest);
  axios
    .get(`https://limitless-headland-79091.herokuapp.com/user/${id}/tasks`)
    .then((res) => {
      const todoList = res.data;
      dispatch(fetchTodoListSuccess(todoList));
    })
    .catch((err) => {
      const error = err.message;
      dispatch(fetchTodoListFailure(error));
    });
};

export const submitTodo = (id, values) => (dispatch) => {
  axios
    .post(`https://limitless-headland-79091.herokuapp.com/user/${id}/tasks`, {
      task: values,
    })
    .then((res) => {
      const todo = res.data;
      dispatch(addTodo(todo));
    })
    .catch((err) => console.log(err));
};

export const removeTodo = (id) => (dispatch) => {
  axios
    .delete(`https://limitless-headland-79091.herokuapp.com/tasks/${id}`)
    .then((res) => {
      console.log(res);
      dispatch(deleteTodo(id));
    })
    .catch((err) => console.log(err));
};

export const doneTodo = (id) => (dispatch) => {
  axios
    .patch(`https://limitless-headland-79091.herokuapp.com/tasks/${id}`, {
      task: { completed: true },
    })
    .then((res) => {
      console.log(res);
      dispatch(isDone(id));
    })
    .catch((err) => console.log(err));
};
