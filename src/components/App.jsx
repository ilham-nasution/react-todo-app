import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import CreateTodo from "./CreateTodo";
import Axios from "axios";

const initialState = {
  title: "",
  details: "",
};

const App = () => {
  const [values, setValues] = useState(initialState);
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);

  useEffect(() => {
    console.log("fetch api");
    const fetchData = async () => {
      const result = await Axios.get(
        "https://glacial-taiga-73174.herokuapp.com"
      );
      setTodoList(result.data);
      setLoading(false);
    };
    fetchData();
  }, [render]);

  const handleInput = (event) => {
    event.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("https://glacial-taiga-73174.herokuapp.com/tasks", {
      task: values,
    }).then((res) => {
      console.log(res);
      setRender(!render);
    });
    setValues(initialState);
  };

  const handleDone = (id) => {
    Axios.patch(`https://glacial-taiga-73174.herokuapp.com/tasks/${id}`, {
      task: { completed: true },
    }).then((res) => {
      console.log(res);
      setRender(!render);
    });
  };

  const handleDelete = (id) => {
    Axios.delete(`https://glacial-taiga-73174.herokuapp.com/tasks/${id}`).then(
      (res) => {
        console.log(res);
        setRender(!render);
      }
    );
  };

  return (
    <div className="container">
      <TodoList
        todoList={todoList}
        loading={loading}
        handleDelete={handleDelete}
        handleDone={handleDone}
      />
      <CreateTodo
        values={values}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
