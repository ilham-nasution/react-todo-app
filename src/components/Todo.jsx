import React from "react";

const Todo = ({ todo, handleDelete, handleDone }) => {
  return (
    <div className="p-3 mb-3 bg-custom rounded shadow">
      <h4 className="text-custom">
        <strong>{todo.completed ? <del>{todo.title}</del> : todo.title}</strong>
      </h4>
      <p className="text-custom">
        {todo.completed ? <del>{todo.details}</del> : todo.details}
      </p>
      <button
        onClick={() => handleDone(todo.id)}
        type="button"
        className="btn btn-custom mr-3"
        disabled={todo.completed}
      >
        Done
      </button>
      <button
        onClick={() => handleDelete(todo.id)}
        type="button"
        className="btn btn-custom-2"
      >
        Delete
      </button>
    </div>
  );
};

export default Todo;
