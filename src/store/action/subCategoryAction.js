import axios from "axios";
import { ALL_SUBCATEGORY_REQUEST, ALL_SUBCATEGORY_SUCCESS, ALL_SUBCATEGORY_FAIL, CLEAR_ERRORS as ALL_SUBCATEGORY_CLEAR_ERRORS } from "../slice/subCategorySlice/allSubCategorySlice";
import { SUBCATEGORY_REQUEST, SUBCATEGORY_SUCCESS, SUBCATEGORY_FAIL, CLEAR_ERRORS as SUBCATEGORY_DETAILS_CLEAR_ERRORS } from "../slice/subCategorySlice/subCategoryDetailsSlice";
import {
  DELETE_SUBCATEGORY_REQUEST,
  UPDATE_SUBCATEGORY_REQUEST,
  DELETE_SUBCATEGORY_SUCCESS,
  UPDATE_SUBCATEGORY_SUCCESS,
  DELETE_SUBCATEGORY_FAIL,
  UPDATE_SUBCATEGORY_FAIL,
  DELETE_SUBCATEGORY_RESET,
  UPDATE_SUBCATEGORY_RESET,
  CLEAR_ERRORS as SUBCATEGORY_CLEAR_ERRORS
} from '../slice/subCategorySlice/subCategorySlice';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function getSubCategory(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_SUBCATEGORY_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/subcategory/all`, payload, config);

      console.log("subcategory data->", data);
      dispatch(ALL_SUBCATEGORY_SUCCESS(data.data));

    } catch (error) {
      dispatch(ALL_SUBCATEGORY_FAIL(error.message));
    }
  };
}

export function getSingleSubCategory(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(SUBCATEGORY_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/subcategory/getsubcategorywithid`, payload, config);

      dispatch(SUBCATEGORY_SUCCESS(data.data));

    } catch (error) {
      dispatch(SUBCATEGORY_FAIL(error.message));
    }
  };
}

export function addSubCategory(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(SUBCATEGORY_REQUEST());

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(`/api/v1/subcategory/add`, payload, config);
      console.log("data------------>", data);
      dispatch(SUBCATEGORY_SUCCESS(data.data));

      toast.success('Data added successfully');

    } catch (error) {
      console.log("err---->", error);
      dispatch(SUBCATEGORY_FAIL(error.response.data.message));

      toast.error(error.response.data.message);
    }
  };
}

export function updateSubCategory(editId, payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_SUBCATEGORY_REQUEST());

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      let endpoint = `/api/v1/subcategory/update?id=${editId}`;
      const { data } = await axios.post(endpoint, payload, config);
      dispatch(UPDATE_SUBCATEGORY_SUCCESS(data.data));

      toast.success(data.data);

    } catch (error) {
      dispatch(UPDATE_SUBCATEGORY_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function deleteSubCategory(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(DELETE_SUBCATEGORY_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/subcategory/delete`;
      const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      console.log("data.data.type == SUCCESS-->", data.data.type == "SUCCESS");
      dispatch(DELETE_SUBCATEGORY_SUCCESS(data.type == "SUCCESS"));

      toast.success(data.data);

    } catch (error) {
      dispatch(DELETE_SUBCATEGORY_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function resetDeleteSubCategory(payload) {
  return async (dispatch, getState) => {
    dispatch(DELETE_SUBCATEGORY_RESET());
  };
}