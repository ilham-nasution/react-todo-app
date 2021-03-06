import React, { useEffect } from "react";
import Todo from "./Todo";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodoList } from "../store/actions";

const TodoList = () => {
  const { loading, todoList } = useSelector((state) => state.todoReducer);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoList(user.id));
  }, [dispatch, user.id]);

  const renderTodoList = todoList.map((todo) => (
    <CSSTransition key={todo.id} timeout={1000} classNames="item">
      <Todo todo={todo} />
    </CSSTransition>
  ));

  return (
    <>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <TransitionGroup>{renderTodoList}</TransitionGroup>
    </>
  );
};

export default TodoList;
