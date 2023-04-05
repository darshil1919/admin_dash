import axios from "axios";
import { ALL_SERVICE_REQUEST, ALL_SERVICE_SUCCESS, ALL_SERVICE_FAIL, CLEAR_ERRORS as ALL_SERVICE_CLEAR_ERRORS } from "../slice/serviceSlice/allServiceSlice";
import { SERVICE_REQUEST, SERVICE_SUCCESS, SERVICE_FAIL, CLEAR_ERRORS as SERVICE_DETAILS_CLEAR_ERRORS } from "../slice/serviceSlice/serviceDetailsSlice";
import {
  DELETE_SERVICE_REQUEST,
  UPDATE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
  UPDATE_SERVICE_FAIL,
  DELETE_SERVICE_RESET,
  UPDATE_SERVICE_RESET,
  CLEAR_ERRORS as SERVICE_CLEAR_ERRORS
} from '../slice/serviceSlice/serviceSlice';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function getService(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_SERVICE_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/service/all`, payload, config);
      // console.log("data-->", data);
      dispatch(ALL_SERVICE_SUCCESS(data.data));

    } catch (error) {
      dispatch(ALL_SERVICE_FAIL(error.message));
    }
  };
}

export function getSingleService(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(SERVICE_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/service/getservicewithid`, payload, config);
      console.log("data->", data);
      dispatch(SERVICE_SUCCESS(data.data));

    } catch (error) {
      dispatch(SERVICE_FAIL(error.message));
    }
  };
}

export function addService(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(SERVICE_REQUEST());

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(`/api/v1/service/add`, payload, config);
      console.log("data------------>", data);
      dispatch(SERVICE_SUCCESS(data.data.message));

      toast.success(data.data.message);

    } catch (error) {
      console.log("error-->", error);
      dispatch(SERVICE_FAIL(error.response.data.message));

      toast.error(error.response.data.message);
    }
  };
}

export function updateService(editId, payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_SERVICE_REQUEST());

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      let endpoint = `/api/v1/service/update?id=${editId}`;
      const { data } = await axios.post(endpoint, payload, config);

      console.log("data.data-->", data);
      dispatch(UPDATE_SERVICE_SUCCESS(data.data));
      toast.success(data.data.message);

    } catch (error) {
      dispatch(UPDATE_SERVICE_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function deleteService(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(DELETE_SERVICE_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/service/delete`;
      const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      console.log("data.data.type == SUCCESS-->", data.data.type == "SUCCESS");
      dispatch(DELETE_SERVICE_SUCCESS(data.type == "SUCCESS"));

      toast.success(data.data);

    } catch (error) {
      dispatch(DELETE_SERVICE_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function resetDeleteService(payload) {
  return async (dispatch, getState) => {
    dispatch(DELETE_SERVICE_RESET());
  };
}