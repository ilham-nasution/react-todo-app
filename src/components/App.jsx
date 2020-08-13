import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import CreateTodo from "./CreateTodo";
import Axios from "axios";
import "./App.css";
import AuthForm from "./AuthForm";

const initialState = {
  title: "",
  details: "",
};

const App = () => {
  const [values, setValues] = useState(initialState);
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

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
      setTodoList((prevItems) => [...prevItems, res.data]);
    });
    setValues(initialState);
  };

  const handleDone = (id) => {
    Axios.patch(`https://glacial-taiga-73174.herokuapp.com/tasks/${id}`, {
      task: { completed: true },
    }).then((res) => {
      const newTodoList = todoList.map((item) => {
        if (item.id === res.data.id) {
          item.completed = true;
        }
        return item;
      });
      setTodoList(newTodoList);
    });
  };

  const handleDelete = (id) => {
    Axios.delete(`https://glacial-taiga-73174.herokuapp.com/tasks/${id}`).then(
      () => {
        const deletedId = id;
        const newTodoList = todoList.filter((item) => item.id !== deletedId);
        setTodoList(newTodoList);
      }
    );
  };

  return (
    <div className="container">
      <h1 className="mb-3 text-white">Task Manager</h1>
      <AuthForm />
      {/* <CreateTodo
        values={values}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
      <TodoList
        todoList={todoList}
        loading={loading}
        handleDelete={handleDelete}
        handleDone={handleDone}
      /> */}
    </div>
  );
};

export default App;
