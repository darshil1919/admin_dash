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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS } from "../slice/adminSlice/updatePassword";
import {FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS} from "../slice/adminSlice/forgotPasswordSlice";

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

        console.log("data-->", data);
        dispatch(LOGIN_SUCCESS(data.data));
      } catch (error) {
        console.log("error-->", error);
        console.log("error.response.data.message--->", error.response.data.message);
        dispatch(LOGIN_FAIL(error.response.data.message));
        toast.error(error.response.data.message)
      }
    };

// Load admin
export const loadAdmin = () => async (dispatch) => {
  try {
    dispatch(LOAD_ADMIN_REQUEST());

    const { data } = await axios.get(`/api/v1/admin/me`);
    console.log("admin-->", data)

    dispatch(LOAD_ADMIN_SUCCESS(data.data));
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

// update admin password
export function updatePassword(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_PASSWORD_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/customer/updatepassword`,
        payload,
        config
      );

      dispatch(UPDATE_PASSWORD_SUCCESS(data.data));
      toast.success(data.data)
    } catch (error) {
      dispatch(UPDATE_PASSWORD_FAIL(error.response.data.message));
      toast.error(error.response.data.message)
    }
  };
}

// forgot password
export function forgotPassword(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(FORGOT_PASSWORD_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/customer/forgotpassword`,
        payload,
        config
      );

      dispatch(FORGOT_PASSWORD_SUCCESS(data.data.message));
      toast.success(data.data.message)
    } catch (error) {
      dispatch(FORGOT_PASSWORD_FAIL(error.response.data.message));
      toast.error(error.response.data.message)
    }
  };
}

// reset password
export function resetPassword(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(RESET_PASSWORD_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/customer/resetpassword`,
        payload,
        config
      );

      dispatch(RESET_PASSWORD_SUCCESS(data.data.message));
      toast.success(data.data.message)
      // const navigate = useNavigate();
      // navigate("/SignIn")
    } catch (error) {
      dispatch(RESET_PASSWORD_FAIL(error.response.data.message));
      toast.error(error.response.data.message)
    }
  };
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};
