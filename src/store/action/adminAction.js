import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../slice/adminSlice/admineSlice";


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(LOGIN_REQUEST);

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/customer/login`,
      { email, password },
      config
    );

    dispatch(LOGIN_SUCCESS(data.data));
  } catch (error) {
    dispatch(LOGIN_FAIL(error.response.data.message));
  }
};