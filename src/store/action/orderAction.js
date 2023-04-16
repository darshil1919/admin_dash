import axios from "axios";
import {
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  CLEAR_ERRORS as ALL_ORDER_CLEAR_ERRORS
} from "../slice/orderSlice/allOrderDetailSlice";
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_CLEAR,
  ORDER_FAIL,
  CLEAR_ERRORS as ORDER_DETAILS_CLEAR_ERRORS
} from "../slice/orderSlice/orderDetailSlice";
import {
  DELETE_ORDER_REQUEST,
  UPDATE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_RESET,
  UPDATE_ORDER_RESET,
  CLEAR_ERRORS as ORDER_CLEAR_ERRORS
} from '../slice/orderSlice/orderSlice';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function getOrder(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_ORDER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/order/getorder`, payload, config);

      dispatch(ALL_ORDER_SUCCESS(data.data));

    } catch (error) {
      dispatch(ALL_ORDER_FAIL(error.message));
    }
  };
}

export function getSingleOrder(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ORDER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/order/getsingleorder`, payload, config);
      dispatch(ORDER_SUCCESS(data.data));

    } catch (error) {
      dispatch(ORDER_FAIL(error.message));
    }
  };
}

export function addOrder(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ORDER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/orderer/addorder`, payload, config);
      dispatch(ORDER_SUCCESS(data.data.message));

      toast.success(data.data.message);

    } catch (error) {
      console.log("error-->", error);
      dispatch(ORDER_FAIL(error.response.data.message));

      toast.error(error.response.data.message);
    }
  };
}

export function updateOrder(editId, payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_ORDER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/order/completework?id=${editId}`;
      const { data } = await axios.post(endpoint, payload, config);

      console.log("data.data-->", data);
      dispatch(UPDATE_ORDER_SUCCESS(data.data));
      toast.success(data.data);

    } catch (error) {
      console.log("error--->", error);
      dispatch(UPDATE_ORDER_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function updateOrderAssignWorker(editId, payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_ORDER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/worker/updaterequest?id=${editId}`;
      const { data } = await axios.post(endpoint, payload, config);

      console.log("data.data-->", data);
      dispatch(UPDATE_ORDER_SUCCESS(data.data));
      toast.success(data.data);

    } catch (error) {
      console.log("error--->", error);
      dispatch(UPDATE_ORDER_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function deleteOrder(deleteId, payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(DELETE_ORDER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/order/deleteorder?id=${deleteId}`;
      const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      console.log("data.data.type == SUCCESS-->", data.data.type == "SUCCESS");
      dispatch(DELETE_ORDER_SUCCESS(data.type == "SUCCESS"));

      toast.success(data.data);

    } catch (error) {
      dispatch(DELETE_ORDER_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function resetDeleteService(payload) {
  return async (dispatch, getState) => {
    dispatch(DELETE_ORDER_RESET());
  };
}

export function clearOrder(payload) {
  return async (dispatch, getState) => {
    dispatch(ORDER_CLEAR());
  };
}