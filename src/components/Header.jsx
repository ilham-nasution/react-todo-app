import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSignOut } from "../redux/reducers/auth";

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  return (
    <div className="container">
      <div className="row p-2 justify-content-between align-items-center">
        <h1 className="text-custom">Task Manager</h1>
        {isLoggedIn && (
          <button
            onClick={() => dispatch(authSignOut())}
            type="button"
            className="btn btn-outline-dark"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
