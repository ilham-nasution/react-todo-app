export const signIn = () => {
  return {
    type: "SIGN_IN",
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
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
