import axios from "axios";
import { setStatus, setAllCategory, setErrorMsg } from "../slice/categorySlice/allCategorySlice";
import status from "../statuses";

export function getCategory() {
  return async (dispatch, getState) => {
    try {
      dispatch(setStatus(status.LOADING));

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.get(`/api/v1/category/alldsfflj`, config);
      console.log(data.data)

      dispatch(setAllCategory(data.data));
      dispatch(setStatus(status.SUCCESS));
    } catch (error) {
      console.log(error)
      dispatch(setStatus(status.ERROR));
      dispatch(setErrorMsg(error.message));
    }
  };
}

export function addCategory(categoryData) {
  return async (dispatch, getState) => {
    try {
      // dispatch(setStatus(status.LOADING));
      // for (const value of categoryData.values()) {
      //   console.log(value);
      // }

      const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`http://localhost:5000/api/v1/category/add`, categoryData, config);
      console.log(data.data)

      // dispatch(setAllCategory(data.data));
      // dispatch(setStatus(status.SUCCESS));
    } catch (error) {
      console.log(error)
      // dispatch(setStatus(status.ERROR));
      // dispatch(setErrorMsg(error.message));
    }
  };
}

// export function clearErrors(){
//   return async (dispatch, getState) => {
//     dispatch(CLEAR_ERRORS);
//   }
// };