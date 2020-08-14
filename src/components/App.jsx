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

const initialAuthState = {
  email: "",
  password: "",
};

const App = () => {
  const [values, setValues] = useState(initialState);
  const [authValues, setAuthValues] = useState(initialAuthState);
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [haveAcc, setHaveAcc] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    Axios.get("https://limitless-headland-79091.herokuapp.com/logged_in", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.logged_in) {
        setLoggedIn(true);
        setUser(res.data.user);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(
        `https://limitless-headland-79091.herokuapp.com/user/${user.id}/tasks`
      );
      console.log(user);
      setTodoList(result.data);
      setLoading(false);
    };
    user.id && fetchData();
  }, [user]);

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
      `https://limitless-headland-79091.herokuapp.com/user/${user.id}/tasks`,
      {
        task: values,
      }
    )
      .then((res) => {
        console.log(res);
        setTodoList((prevItems) => [...prevItems, res.data]);
      })
      .catch((err) => console.log(err));
    setValues(initialState);
  };

  const handleDone = (id) => {
    Axios.patch(`https://limitless-headland-79091.herokuapp.com/tasks/${id}`, {
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
    Axios.delete(
      `https://limitless-headland-79091.herokuapp.com/tasks/${id}`
    ).then(() => {
      const deletedId = id;
      const newTodoList = todoList.filter((item) => item.id !== deletedId);
      setTodoList(newTodoList);
    });
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    setError("");
    Axios.post(
      `https://limitless-headland-79091.herokuapp.com/${
        haveAcc ? "sessions" : "registrations"
      }`,
      {
        user: authValues,
      },
      { withCredentials: true }
    )
      .then((res) => {
        console.log(res);
        if (res.data.status === "created") {
          setLoggedIn(res.data.logged_in);
          setUser(res.data.user);
        } else {
          setError(res.data.error);
        }
        setAuthValues(initialAuthState);
      })
      .catch((err) => console.log(err));
  };

  const handleAuthForm = () => {
    setHaveAcc(!haveAcc);
  };

  const handleAuthInput = (event) => {
    event.persist();
    setAuthValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogout = () => {
    Axios.delete("https://limitless-headland-79091.herokuapp.com/logout", {
      withCredentials: true,
    })
      .then(setLoggedIn(false))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center">
        <h1 className="mb-3 text-white">Task Manager</h1>
        {loggedIn && (
          <button
            onClick={handleLogout}
            type="button"
            className="btn btn-outline-light"
          >
            Log Out
          </button>
        )}
      </div>
      {loggedIn ? (
        <>
          <CreateTodo
            values={values}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
          />
          <TodoList
            todoList={todoList}
            loading={loading}
            handleDelete={handleDelete}
            handleDone={handleDone}
          />
        </>
      ) : (
        <AuthForm
          handleAuthSubmit={handleAuthSubmit}
          haveAcc={haveAcc}
          handleAuthForm={handleAuthForm}
          handleAuthInput={handleAuthInput}
          authValues={authValues}
          error={error}
        />
      )}
    </div>
  );
};

export default App;
