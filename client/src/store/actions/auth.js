import { AUTH, LOGOUT } from "./actionTypes.js";
import * as api from "../api/index.js";

export const login = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);

    dispatch({ type: AUTH, payload: data });

    router.push("/");
  } catch (error) {
    return error.response.data.errorMessage;
  }
};

export const signUp = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, payload: data });

    router.push("/");
  } catch (error) {
    return error.response.data.errorMessage;
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
