import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSignOut } from "../store/actions";

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-2">
        <h1 className="text-dark"><strong>My Task Manager</strong></h1>
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
