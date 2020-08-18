import React, { useState, useEffect, createContext } from "react";
import Axios from "axios";

export const AuthContext = createContext();

const initialAuthState = {
  email: "",
  password: "",
};

export const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [haveAcc, setHaveAcc] = useState(true);
  const [error, setError] = useState("");
  const [authValues, setAuthValues] = useState(initialAuthState);

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
    <AuthContext.Provider
      value={[
        loggedIn,
        user,
        error,
        haveAcc,
        authValues,
        handleAuthSubmit,
        handleAuthForm,
        handleAuthInput,
        handleLogout,
      ]}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
