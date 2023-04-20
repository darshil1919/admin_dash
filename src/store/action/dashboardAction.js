import axios from "axios";
import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
  DASHBOARD_CLEAR,
  CLEAR_ERRORS
} from "../slice/dashboardSlice/dashboardSlice";

export function getAdminDashboard(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(DASHBOARD_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/dashboard/admin`, payload, config);

      dispatch(DASHBOARD_SUCCESS(data.data));
    } catch (error) {
      dispatch(ALL_CATEGODASHBOARD_FAILRY_FAIL(error.message));
    }
  };
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};
