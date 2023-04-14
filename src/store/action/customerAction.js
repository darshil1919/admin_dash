import axios from "axios";
import { ALL_CUSTOMER_REQUEST, ALL_CUSTOMER_SUCCESS, ALL_CUSTOMER_FAIL, CLEAR_ERRORS as ALL_CUSTOMER_CLEAR_ERRORS } from "../slice/customerSlice/allCustomerSlice";
import { CUSTOMER_REQUEST, CUSTOMER_SUCCESS, CUSTOMER_FAIL, CLEAR_ERRORS as CUSTOMER_DETAILS_CLEAR_ERRORS } from "../slice/customerSlice/customerDetailsSlice";
import {
  DELETE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_RESET,
  UPDATE_CUSTOMER_RESET,
  CLEAR_ERRORS as CUSTOMER_CLEAR_ERRORS
} from '../slice/customerSlice/customerSlice';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function getCustomer(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_CUSTOMER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/customer/getCustomer`, payload, config);

      console.log("customer data->", data);
      dispatch(ALL_CUSTOMER_SUCCESS(data.data));

    } catch (error) {
      dispatch(ALL_CUSTOMER_FAIL(error.message));
    }
  };
}

export function getSingleCustomer(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(CUSTOMER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/customer/getcustomerwithid`, payload, config);

      dispatch(CUSTOMER_SUCCESS(data.data));

    } catch (error) {
      dispatch(CUSTOMER_FAIL(error.message));
    }
  };
}

export function addCustomer(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(CUSTOMER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/customer/add`, payload, config);
      console.log("data------------>", data);
      dispatch(CUSTOMER_SUCCESS(data.data));

      toast.success('Data added successfully');

    } catch (error) {
      console.log("err---->", error);
      dispatch(CUSTOMER_FAIL(error.response.data.message));

      toast.error(error.response.data.message);
    }
  };
}

export function updateCustomer(editId, payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_CUSTOMER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/customer/updatecustomer?id=${editId}`;
      const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      dispatch(UPDATE_CUSTOMER_SUCCESS(data.data));

      toast.success(data.data.message);

    } catch (error) {
      dispatch(UPDATE_CUSTOMER_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function deleteCustomer(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(DELETE_CUSTOMER_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/customer/delete`;
      // const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      console.log("data.data.type == SUCCESS-->", data.data.type == "SUCCESS");
      dispatch(DELETE_CUSTOMER_SUCCESS(data.type == "SUCCESS"));

      toast.success(data.data);

    } catch (error) {
      dispatch(DELETE_CUSTOMER_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function resetDeleteCustomer(payload) {
  return async (dispatch, getState) => {
    dispatch(DELETE_CUSTOMER_RESET());
  };
}