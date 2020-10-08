import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitTodo } from "../redux/reducers/todo";

const CreateTodo = ({ user }) => {
  console.log("render create");
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: "",
    details: "",
  });

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
      <button type="submit" className="btn btn-custom">
        Submit
      </button>
    </form>
  );
};

export default CreateTodo;
