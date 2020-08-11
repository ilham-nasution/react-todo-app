import React from "react";

const CreateTodo = ({ handleSubmit, handleInput, values }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          onChange={handleInput}
          value={values.title}
          name="title"
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="details">Details</label>
        <input
          onChange={handleInput}
          value={values.details}
          name="details"
          type="text"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CreateTodo;
