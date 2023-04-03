import axios from "axios";
import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOAD_ADMIN_REQUEST,
  LOAD_ADMIN_SUCCESS,
  LOAD_ADMIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../slice/adminSlice/admineSlice";

// admin login
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(LOGIN_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/admin/login`,
        { email, password },
        config
      );

      dispatch(LOGIN_SUCCESS(data.data));
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(LOGIN_FAIL(error.response.data.message));
    }
  };

// Load admin
export const loadAdmin = () => async (dispatch) => {
  try {
    dispatch(LOAD_ADMIN_REQUEST());

    const { data } = await axios.get(`/api/v1/admin/me`);
    console.log(data)

    dispatch(LOAD_ADMIN_SUCCESS(data.admin));
  } catch (error) {
    dispatch(LOAD_ADMIN_FAIL(error.response.data.message));
  }
};

// Logout Admin
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/admin/logout`);

    dispatch(LOGOUT_SUCCESS());
  } catch (error) {
    dispatch(LOGOUT_FAIL(error.response.data.message));
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};
