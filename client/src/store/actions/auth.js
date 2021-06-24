import { AUTH, LOGOUT } from "./actionTypes.js";
import * as api from "../api/index.js";

export const login = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);

    dispatch({ type: AUTH, payload: data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, payload: data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const logout = (dispatch) => {
  dispatch({ type: LOGOUT });
};
