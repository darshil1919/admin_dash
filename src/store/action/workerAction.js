import axios from "axios";
import { ALL_WORKER_REQUEST, ALL_WORKER_SUCCESS, ALL_WORKER_FAIL, CLEAR_ERRORS as ALL_WORKER_CLEAR_ERRORS } from "../slice/workerSlice/allWorkerSlice";
import { WORKER_REQUEST, WORKER_SUCCESS, WORKER_FAIL, CLEAR_ERRORS as WORKER_DETAILS_CLEAR_ERRORS } from "../slice/workerSlice/workerDetailsSlice";
import {
  DELETE_WORKER_REQUEST,
  UPDATE_WORKER_REQUEST,
  DELETE_WORKER_SUCCESS,
  UPDATE_WORKER_SUCCESS,
  DELETE_WORKER_FAIL,
  UPDATE_WORKER_FAIL,
  DELETE_WORKER_RESET,
  UPDATE_WORKER_RESET,
  CLEAR_ERRORS as WORKER_CLEAR_ERRORS
} from '../slice/workerSlice/workerSlice';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function getWorker(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_WORKER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/worker/getworker`, payload, config);

      console.log("worker data->", data);
      dispatch(ALL_WORKER_SUCCESS(data.data));

    } catch (error) {
      dispatch(ALL_WORKER_FAIL(error.message));
    }
  };
}

export function getSingleWorker(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(WORKER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/worker/getworkerwithid`, payload, config);

      dispatch(WORKER_SUCCESS(data.data));

    } catch (error) {
      dispatch(WORKER_FAIL(error.message));
    }
  };
}

export function addWorker(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(WORKER_REQUEST());

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(`/api/v1/worker/add`, payload, config);
      console.log("data------------>", data);
      dispatch(WORKER_SUCCESS(data.data));

      toast.success('Data added successfully');

    } catch (error) {
      console.log("err---->", error);
      dispatch(WORKER_FAIL(error.response.data.message));

      toast.error(error.response.data.message);
    }
  };
}

export function updateWorker(editId, payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_WORKER_REQUEST());

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      let endpoint = `/api/v1/worker/updateworker?id=${editId}`;
      const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      dispatch(UPDATE_WORKER_SUCCESS(data.data));

      toast.success(data.data.message);

    } catch (error) {
      dispatch(UPDATE_WORKER_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function deleteWorker(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(DELETE_WORKER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/worker/delete`;
      const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      console.log("data.data.type == SUCCESS-->", data.data.type == "SUCCESS");
      dispatch(DELETE_WORKER_SUCCESS(data.type == "SUCCESS"));

      toast.success(data.data);

    } catch (error) {
      dispatch(DELETE_WORKER_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function resetDeleteWorker(payload) {
  return async (dispatch, getState) => {
    dispatch(DELETE_WORKER_RESET());
  };
}