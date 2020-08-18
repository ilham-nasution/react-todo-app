import React, { useContext } from "react";
import Todo from "./Todo";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { TodoContext } from "./TodoContext";

const TodoList = () => {
  const [, todoList, loading, , , handleDone, handleDelete] = useContext(
    TodoContext
  );

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
          <CSSTransition key={todo.id} timeout={1000} classNames="item">
            <Todo
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
