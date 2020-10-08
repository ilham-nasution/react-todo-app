import React, { useEffect } from "react";
import Todo from "./Todo";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodoList } from "../redux/reducers/todo";

const TodoList = ({ user }) => {
  const { loading, todoList } = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoList(user.id));
  }, [dispatch, user.id]);

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
              // handleDone={handleDone}
              // handleDelete={handleDelete}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

export default TodoList;
