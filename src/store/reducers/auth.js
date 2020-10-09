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
