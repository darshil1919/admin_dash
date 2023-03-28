import axios from "axios";
import { ALL_CATEGORY_REQUEST, ALL_CATEGORY_SUCCESS, ALL_CATEGORY_FAIL } from '../slice/categorySlice/allCategorySlice';


export function getCategory() {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_CATEGORY_REQUEST);

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.get(`/api/v1/category/all`, config);
      
      dispatch(ALL_CATEGORY_SUCCESS(data.data));
    } catch (error) {
      dispatch(ALL_CATEGORY_FAIL(error.message));
    }
  };
}

export function addCategory(categoryData) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_CATEGORY_REQUEST);

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(`/api/v1/category/add`, categoryData, config);
      console.log("all category->", data.data)

    } catch (error) {
      console.log(error)
      // dispatch(setStatus(status.ERROR));
      // dispatch(setErrorMsg(error.message));
    }
  };
}

export const editCategory = async (editId, categoryData) => {
  try {
    // dispatch(setStatus(status.LOADING));
    // for (const value of categoryData.values()) {
    //   console.log(value);
    // }
    console.log("in edit category");

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const data = await axios.put(`/api/v1/category/update/${editId}`, categoryData, config);
    console.log("all category->", data.data)

    // dispatch(setAllCategory(data.data));
    // dispatch(setStatus(status.SUCCESS));
  } catch (error) {
    console.log(error)
    // dispatch(setStatus(status.ERROR));
    // dispatch(setErrorMsg(error.message));
  }
}


