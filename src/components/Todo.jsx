import React from "react";

const Todo = ({ todo, handleDelete, handleDone }) => {
  return (
    <div className="border p-3 mb-3">
      <h5>{todo.completed ? <del>{todo.title}</del> : todo.title}</h5>
      <p>{todo.completed ? <del>{todo.details}</del> : todo.details}</p>
      <button
        onClick={() => handleDone(todo.id)}
        type="button"
        className="btn btn-primary mr-3"
        disabled={todo.completed}
      >
        Done
      </button>
      <button
        onClick={() => handleDelete(todo.id)}
        type="button"
        className="btn btn-danger"
      >
        Delete
      </button>
    </div>
  );
};

export default Todo;
