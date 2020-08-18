import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const AuthForm = () => {
  const [
    ,
    ,
    error,
    haveAcc,
    authValues,
    handleAuthSubmit,
    handleAuthForm,
    handleAuthInput,
    ,
  ] = useContext(AuthContext);

  return (
    <div className="bg-custom p-2 rounded w-75">
      <form onSubmit={handleAuthSubmit}>
        <h3>{haveAcc ? "Sign In" : "Sign Up"}</h3>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={authValues.email}
            onChange={handleAuthInput}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={authValues.password}
            className="form-control"
            name="password"
            onChange={handleAuthInput}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-custom">
          Submit
        </button>
      </form>
      {haveAcc ? (
        <button
          onClick={handleAuthForm}
          type="button"
          className="btn btn-custom mt-2"
        >
          Don't have account? Sign Up
        </button>
      ) : (
        <button
          onClick={handleAuthForm}
          type="button"
          className="btn btn-custom mt-2"
        >
          Already have account? Sign In
        </button>
      )}
    </div>
  );
};

export default AuthForm;
