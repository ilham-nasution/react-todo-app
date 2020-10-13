import React from "react";
import { useDispatch } from "react-redux";
import { removeTodo, doneTodo } from "../store/actions";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className="p-3 mb-2 bg-light rounded shadow-sm">
      <div className="d-flex justify-content-between">
      <h5 className="text-dark m-0">
        <strong>{todo.completed ? <del>{todo.title}</del> : todo.title}</strong>
      </h5>
      <div>
      <button
        onClick={() => dispatch(doneTodo(todo.id))}
        type="button"
        className="btn btn-link p-0 mr-1"
        disabled={todo.completed}
      >
      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2-square text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        <path fillRule="evenodd" d="M1.5 13A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V8a.5.5 0 0 0-1 0v5a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 3v10z"/>
      </svg>
      </button>
      <button
        onClick={() => dispatch(removeTodo(todo.id))}
        type="button"
        className="btn btn-link p-0"
      >
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash2 text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3.18 4l1.528 9.164a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836L12.82 4H3.18zm.541 9.329A2 2 0 0 0 5.694 15h4.612a2 2 0 0 0 1.973-1.671L14 3H2l1.721 10.329z"/>
          <path d="M14 3c0 1.105-2.686 2-6 2s-6-.895-6-2 2.686-2 6-2 6 .895 6 2z"/>
          <path fillRule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z"/>
        </svg>
      </button>
      </div>
      </div>
      <p className="text-dark m-0">
        {todo.completed ? <del>{todo.details}</del> : todo.details}
      </p>
    </div>
  );
};

export default React.memo(Todo);
