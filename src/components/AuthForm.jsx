import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSignIn } from "../store/actions";

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
    <div className="bg-light p-4 rounded w-100 shadow">
      <form onSubmit={handleSubmit}>
        <div className="text-center text-dark">
          <h3>{haveAcc ? "Sign In" : "Sign Up"}</h3>
        </div>
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
        <div className="text-center">
          <button type="submit" className="btn btn-outline-dark">
            Submit
          </button>
        </div>
      </form>
      <div className="text-center">
        {haveAcc ? (
          <button
            onClick={() => setHaveAcc(false)}
            type="button"
            className="btn btn-link mt-2"
          >
            Don't have account? Sign Up
          </button>
        ) : (
          <button
            onClick={() => setHaveAcc(true)}
            type="button"
            className="btn btn-link mt-2"
          >
            Already have account? Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
