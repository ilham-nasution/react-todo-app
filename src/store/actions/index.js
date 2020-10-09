import axios from "axios";

export const signInSuccess = (user) => {
  return {
    type: "SIGN_IN_SUCCESS",
    payload: user,
  };
};

export const signInFailure = (error) => {
  return {
    type: "SIGN_IN_FAILURE",
    payload: error,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const loggedIn = () => (dispatch) => {
  axios
    .get("https://limitless-headland-79091.herokuapp.com/logged_in", {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.logged_in) {
        dispatch(signInSuccess(res.data.user));
      }
    })
    .catch((err) => console.log(err));
};

export const authSignIn = (haveAcc, values) => (dispatch) => {
  axios
    .post(
      `https://limitless-headland-79091.herokuapp.com/${
        haveAcc ? "sessions" : "registrations"
      }`,
      {
        user: values,
      },
      { withCredentials: true }
    )
    .then((res) => {
      if (res.data.status === "created") {
        dispatch(signInSuccess(res.data.user));
      } else {
        dispatch(signInFailure(res.data.error));
      }
    })
    .catch((err) => console.log(err));
};

export const authSignOut = () => (dispatch) => {
  axios
    .delete("https://limitless-headland-79091.herokuapp.com/logout", {
      withCredentials: true,
    })
    .then(dispatch(signOut()))
    .catch((err) => console.log(err));
};

export const fetchTodoListRequest = () => ({
  type: "FETCH_TODO_LIST_REQUEST",
});

export const fetchTodoListSuccess = (todoList) => ({
  type: "FETCH_TODO_LIST_SUCCESS",
  payload: todoList,
});

export const fetchTodoListFailure = (error) => ({
  type: "FETCH_TODO_LIST_FAILURE",
  payload: error,
});

export const addTodo = (todo) => ({
  type: "ADD_TODO",
  payload: todo,
});

export const deleteTodo = (id) => ({
  type: "DELETE_TODO",
  payload: id,
});

export const isDone = (id) => ({
  type: "DONE_TODO",
  payload: id,
});

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
