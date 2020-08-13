import React, { useState } from "react";
import Axios from "axios";

const initialState = {
  email: "",
  password: "",
};
const AuthForm = () => {
  const [values, setValues] = useState(initialState);
  const [haveAcc, setHaveAcc] = useState(true);

  const handleInput = (event) => {
    event.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(
      `http://localhost:3001/${haveAcc ? "sessions" : "registrations"}`,
      {
        user: values,
      }
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleAuthForm = () => {
    setHaveAcc(!haveAcc);
  };

  return (
    <div className="bg-custom p-2 rounded">
      <form onSubmit={handleSubmit}>
        <h3>{haveAcc ? "Sign In" : "Sign Up"}</h3>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={values.email}
            onChange={handleInput}
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
            onChange={handleInput}
          />
        </div>

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
