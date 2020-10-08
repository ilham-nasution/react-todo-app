import {
  fetchTodoListFailure,
  fetchTodoListRequest,
  fetchTodoListSuccess,
  addTodo,
  deleteTodo,
  isDone,
} from "../actions";
import axios from "axios";

const initialState = {
  loading: false,
  todoList: [],
  error: "",
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TODO_LIST_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }

    case "FETCH_TODO_LIST_SUCCESS": {
      return {
        loading: false,
        todoList: action.payload,
        error: "",
      };
    }

    case "FETCH_TODO_LIST_FAILURE": {
      return {
        loading: false,
        todoList: [],
        error: action.payload,
      };
    }

    case "ADD_TODO": {
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    }

    case "DELETE_TODO": {
      return {
        ...state,
        todoList: [...state.todoList].filter(
          (item) => item.id !== action.payload
        ),
      };
    }

    case "DONE_TODO": {
      return {
        ...state,
        todoList: [...state.todoList].map((item) => {
          if (item.id === action.payload) {
            item.completed = true;
          }
          return item;
        }),
      };
    }

    default:
      return state;
  }
};

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
    });
};
