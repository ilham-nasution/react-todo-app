import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { submitTodo } from "../redux/reducers/todo";

const INITIAL_STATE = {
  title: "",
  details: "",
};

const CreateTodo = () => {
  console.log("render create");
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [values, setValues] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    e.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitTodo(user.id, values));
    setValues(INITIAL_STATE);
  };

  return (
    <form
      className="bg-custom-2 p-3 rounded shadow mb-2"
      onSubmit={handleSubmit}
    >
      <h3 className="mb-1">
        <strong>Create Task</strong>
      </h3>
      <div className="form-group">
        <label className="m-0" htmlFor="title">
          Title
        </label>
        <input
          onChange={handleChange}
          value={values.title}
          name="title"
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="m-0" htmlFor="details">
          Details
        </label>
        <textarea
          onChange={handleChange}
          value={values.details}
          name="details"
          type="text"
          className="form-control"
        />
      </div>
      <button
        type="submit"
        className="btn btn-custom"
        disabled={values.title === ""}
      >
        Submit
      </button>
    </form>
  );
};

export default CreateTodo;
