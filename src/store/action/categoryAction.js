import axios from "axios";
import { ALL_CATEGORY_REQUEST,  ALL_CATEGORY_SUCCESS,  ALL_CATEGORY_FAIL } from '../slice/categorySlice/allCategorySlice';

export function getCategory() {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_CATEGORY_REQUEST);

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.get(`/api/v1/category/all`, config);
      console.log(data.data)

      dispatch(ALL_CATEGORY_SUCCESS(data.data));
    } catch (error) {
      dispatch(ALL_CATEGORY_FAIL(error.message));
    }
  };
}