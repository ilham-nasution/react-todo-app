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
