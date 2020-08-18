import React, { useContext } from "react";
import { TodoContext } from "./TodoContext";

const CreateTodo = () => {
  const [values, , , handleInput, handleSubmit] = useContext(TodoContext);

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
          onChange={handleInput}
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
          onChange={handleInput}
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
