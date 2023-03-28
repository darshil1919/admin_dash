import axios from "axios";
import { ALL_SUBCATEGORY_REQUEST, ALL_SUBCATEGORY_SUCCESS, ALL_SUBCATEGORY_FAIL, CLEAR_ERRORS } from "../slice/subCategorySlice/allSubCategorySlice";
import { SUBCATEGORY_REQUEST, SUBCATEGORY_SUCCESS, SUBCATEGORY_FAIL, SUBCATEGORY_CLEAR_ERRORS } from "../slice/subCategorySlice/subCategorySlice";

export function getSubCategory() {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_SUBCATEGORY_REQUEST);

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.get(`/api/v1/subcategory/all`, config);

      dispatch(ALL_SUBCATEGORY_SUCCESS(data.data));

    } catch (error) {
      dispatch(ALL_SUBCATEGORY_FAIL(error.message));
    }
  };
}

export function getSingleSubCategory(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(SUBCATEGORY_REQUEST);

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/subcategory/getsubcategorywithid`, payload, config);

      dispatch(SUBCATEGORY_SUCCESS(data.data));

    } catch (error) {
      dispatch(SUBCATEGORY_FAIL(error.message));
    }
  };
}