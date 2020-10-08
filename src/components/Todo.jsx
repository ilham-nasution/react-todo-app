import React from "react";
import { useDispatch } from "react-redux";
import { removeTodo, doneTodo } from "../redux/reducers/todo";

const Todo = ({ todo }) => {
  console.log("render todo");
  const dispatch = useDispatch();

  return (
    <div className="px-4 py-2 mb-3 bg-custom rounded shadow">
      <div className="row justify-content-between align-items-center">
        <div>
          <h4 className="text-custom m-0">
            <strong>
              {todo.completed ? <del>{todo.title}</del> : todo.title}
            </strong>
          </h4>
          <p className="text-custom m-0">
            {todo.completed ? <del>{todo.details}</del> : todo.details}
          </p>
        </div>
        <div>
          <button
            onClick={() => dispatch(doneTodo(todo.id))}
            type="button"
            className="btn btn-custom mr-3"
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
      </div>
    </div>
  );
};

export default Todo;
