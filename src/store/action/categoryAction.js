import axios from "axios";
import { ALL_CATEGORY_REQUEST, ALL_CATEGORY_SUCCESS, ALL_CATEGORY_FAIL } from '../slice/categorySlice/allCategorySlice';
import { NEW_CATEGORY_REQUEST, NEW_CATEGORY_SUCCESS, NEW_CATEGORY_FAIL } from '../slice/categorySlice/newCategorySlice';
import {
  DELETE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
  CLEAR_ERRORS as CATEGORY_CLEAR_ERRORS
} from '../slice/categorySlice/categorySlice';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function getCategory(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_CATEGORY_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/category/all`, payload, config);

      dispatch(ALL_CATEGORY_SUCCESS(data.data));
    } catch (error) {
      dispatch(ALL_CATEGORY_FAIL(error.message));
    }
  };
}

export function addCategory(categoryData) {
  return async (dispatch, getState) => {
    try {
      dispatch(NEW_CATEGORY_REQUEST());

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(`/api/v1/category/add`, categoryData, config);

      console.log("data-->", data);
      dispatch(NEW_CATEGORY_SUCCESS(data.data.data));

      toast.success(data.data.message);

    } catch (error) {
      console.log(error);
      dispatch(NEW_CATEGORY_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function editCategory(editId, categoryData) {
  return async (dispatch, getState) => {
    try {

      dispatch(UPDATE_CATEGORY_REQUEST());

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      let endpoint = `/api/v1/category/update?id=${editId}`;
      const { data } = await axios.post(endpoint, categoryData, config);
      console.log("all category->", data);

      dispatch(UPDATE_CATEGORY_SUCCESS(data.type == "SUCCESS"));

      toast.success(data.data);

    } catch (error) {
      // console.log(error)
      dispatch(UPDATE_CATEGORY_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  }
}

export function deleteCategory(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(DELETE_CATEGORY_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/category/delete`;
      const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      console.log("data.data.type == SUCCESS-->", data.data.type == "SUCCESS");
      dispatch(DELETE_CATEGORY_SUCCESS(data.type == "SUCCESS"));

      toast.success(data.data);

    } catch (error) {
      dispatch(DELETE_CATEGORY_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}


