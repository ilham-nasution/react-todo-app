import React, { useContext } from "react";
import TodoList from "./TodoList";
import CreateTodo from "./CreateTodo";
import AuthForm from "./AuthForm";
import { AuthContext } from "./AuthContext";
// import { useSelector, useDispatch } from "react-redux";
// import { signIn, signOut } from "../redux/actions";

const Homepage = () => {
  console.log("render home");
  const [loggedIn, user] = useContext(AuthContext);
  // const auth = useSelector((state) => state.authReducer);
  // const dispatch = useDispatch();

  return (
    <div className="container">
      {loggedIn ? (
        <div className="w-100">
          <CreateTodo user={user} />
          <TodoList user={user} />
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
