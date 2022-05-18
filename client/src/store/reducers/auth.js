import { AUTH, GET_USER, LOGOUT } from "../actions/actionTypes.js";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));

      return {
        ...state,
        authData: action.payload,
        loading: false,
        errors: null,
      };

    case LOGOUT:
      localStorage.removeItem("user");

      return { ...state, authData: null, loading: false, errors: null };

    case GET_USER:
      return {
        ...state,

        authData: action.payload,
        loading: false,
        errors: null,
      };

    default:
      return state;
  }
};

export default authReducer;
