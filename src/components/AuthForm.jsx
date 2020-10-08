import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSignIn } from "../redux/reducers/auth";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const AuthForm = () => {
  const [values, setValues] = useState(INITIAL_STATE);
  const [haveAcc, setHaveAcc] = useState(true);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.authReducer);

  const handleChange = (e) => {
    e.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authSignIn(haveAcc, values));
  };

  return (
    <div className="bg-custom p-2 rounded w-75">
      <form onSubmit={handleSubmit}>
        <h3>{haveAcc ? "Sign In" : "Sign Up"}</h3>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={values.email}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={values.password}
            className="form-control"
            name="password"
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-custom">
          Submit
        </button>
      </form>
      {haveAcc ? (
        <button
          onClick={() => setHaveAcc(false)}
          type="button"
          className="btn btn-custom mt-2"
        >
          Don't have account? Sign Up
        </button>
      ) : (
        <button
          onClick={() => setHaveAcc(true)}
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
