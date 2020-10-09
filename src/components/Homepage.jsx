import React, { useEffect } from "react";
import TodoList from "./TodoList";
import CreateTodo from "./CreateTodo";
import AuthForm from "./AuthForm";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn } from "../redux/reducers/auth";

const Homepage = () => {
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loggedIn());
  }, [dispatch]);

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="w-100">
          <CreateTodo />
          <TodoList />
        </div>
      ) : (
        <div className="center-items">
          <AuthForm />
        </div>
      )}
    </div>
  );
};

export default Homepage;
