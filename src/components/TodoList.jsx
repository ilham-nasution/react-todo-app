import React from "react";
import Todo from "./Todo";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const TodoList = ({ loading, todoList, handleDelete, handleDone }) => {
  return (
    <>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <TransitionGroup>
        {todoList.map((todo) => (
          <CSSTransition timeout={1000} classNames="item">
            <Todo
              key={todo.id}
              todo={todo}
              handleDone={handleDone}
              handleDelete={handleDelete}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

export default TodoList;
