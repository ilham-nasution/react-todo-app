import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSignOut } from "../redux/reducers/auth";

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  return (
    <div className="container-fluid">
      <div className="row p-2 justify-content-between align-items-center">
        <h1 className="mb-3 text-white">Task Manager</h1>
        {isLoggedIn && (
          <button
            onClick={() => dispatch(authSignOut())}
            type="button"
            className="btn btn-outline-light"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
