import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Header = () => {
  const [loggedIn, , , , , , , , handleLogout] = useContext(AuthContext);

  return (
    <div className="container-fluid">
      <div className="row p-2 justify-content-between align-items-center">
        <h1 className="mb-3 text-white">Task Manager</h1>
        {loggedIn && (
          <button
            onClick={handleLogout}
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
