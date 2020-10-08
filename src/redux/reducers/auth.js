import axios from "axios";
import { signInFailure, signInSuccess, signOut } from "../actions";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN_SUCCESS":
      return {
        isLoggedIn: true,
        user: action.payload,
        error: "",
      };
    case "SIGN_IN_FAILURE":
      return {
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    case "SIGN_OUT":
      return {
        isLoggedIn: false,
        user: null,
        error: "",
      };
    default:
      return state;
  }
};

export const loggedIn = () => (dispatch) => {
  axios
    .get("https://limitless-headland-79091.herokuapp.com/logged_in", {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.logged_in) {
        dispatch(signInSuccess(res.data.user));
      }
    })
    .catch((err) => console.log(err));
};

export const authSignIn = (haveAcc, values) => (dispatch) => {
  axios
    .post(
      `https://limitless-headland-79091.herokuapp.com/${
        haveAcc ? "sessions" : "registrations"
      }`,
      {
        user: values,
      },
      { withCredentials: true }
    )
    .then((res) => {
      if (res.data.status === "created") {
        dispatch(signInSuccess(res.data.user));
      } else {
        dispatch(signInFailure(res.data.error));
      }
    })
    .catch((err) => console.log(err));
};

export const authSignOut = () => (dispatch) => {
  axios
    .delete("https://limitless-headland-79091.herokuapp.com/logout", {
      withCredentials: true,
    })
    .then(dispatch(signOut()))
    .catch((err) => console.log(err));
};
