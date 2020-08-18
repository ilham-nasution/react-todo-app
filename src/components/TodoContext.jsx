import React, { useState, useEffect, useContext, createContext } from "react";
import Axios from "axios";
import { AuthContext } from "./AuthContext";

export const TodoContext = createContext();

const initialState = {
  title: "",
  details: "",
};

export const TodoProvider = (props) => {
  const user = useContext(AuthContext)[1];

  const [values, setValues] = useState(initialState);
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(
        `https://limitless-headland-79091.herokuapp.com/user/${user.id}/tasks`
      );
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

  return (
    <TodoContext.Provider
      value={[
        values,
        todoList,
        loading,
        handleInput,
        handleSubmit,
        handleDone,
        handleDelete,
      ]}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
