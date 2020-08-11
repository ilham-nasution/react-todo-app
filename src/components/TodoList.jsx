import React from "react";
import Todo from "./Todo";

const TodoList = ({ loading, todoList, handleDelete, handleDone }) => {
  return (
    <>
      <h1 className="mb-5">Todo List</h1>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {todoList.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          handleDone={handleDone}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};

export default TodoList;
