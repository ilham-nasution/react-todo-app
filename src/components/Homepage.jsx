import React, { useContext } from "react";
import TodoList from "./TodoList";
import CreateTodo from "./CreateTodo";
import AuthForm from "./AuthForm";
import { AuthContext } from "./AuthContext";

const Homepage = () => {
  const [loggedIn] = useContext(AuthContext);

  return (
    <div className="container">
      {loggedIn ? (
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
