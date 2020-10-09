import React from "react";
import { useDispatch } from "react-redux";
import { removeTodo, doneTodo } from "../redux/reducers/todo";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className="p-4 mb-3 bg-custom rounded shadow">
      <h4 className="text-custom m-0">
        <strong>{todo.completed ? <del>{todo.title}</del> : todo.title}</strong>
      </h4>
      <p className="text-custom">
        {todo.completed ? <del>{todo.details}</del> : todo.details}
      </p>

      <button
        onClick={() => dispatch(doneTodo(todo.id))}
        type="button"
        className="btn btn-custom mr-1"
        disabled={todo.completed}
      >
        Done
      </button>
      <button
        onClick={() => dispatch(removeTodo(todo.id))}
        type="button"
        className="btn btn-custom-2"
      >
        Delete
      </button>
    </div>
  );
};

export default React.memo(Todo);
