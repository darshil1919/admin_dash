import axios from "axios";
import { ALL_CONTACTUS_REQUEST, ALL_CONTACTUS_SUCCESS, ALL_CONTACTUS_FAIL, CLEAR_ERRORS as ALL_CONTACTUS_CLEAR_ERRORS } from "../slice/contactUsSlice/allContactUsSlice";
import { CONTACTUS_REQUEST, CONTACTUS_SUCCESS, CONTACTUS_FAIL, CLEAR_ERRORS as CONTACTUS_DETAILS_CLEAR_ERRORS } from "../slice/contactUsSlice/contactUsDetailsSlice";
import {
  DELETE_CONTACTUS_REQUEST,
  UPDATE_CONTACTUS_REQUEST,
  DELETE_CONTACTUS_SUCCESS,
  UPDATE_CONTACTUS_SUCCESS,
  DELETE_CONTACTUS_FAIL,
  UPDATE_CONTACTUS_FAIL,
  DELETE_CONTACTUS_RESET,
  UPDATE_CONTACTUS_RESET,
  CLEAR_ERRORS as CONTACTUS_CLEAR_ERRORS
} from '../slice/contactUsSlice/contactUsSlice';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function getContactUs(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_CONTACTUS_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/contactUs/all`, payload, config);

      console.log("contactUs data->", data);
      dispatch(ALL_CONTACTUS_SUCCESS(data.data));

    } catch (error) {
      dispatch(ALL_CONTACTUS_FAIL(error.message));
    }
  };
}

export function getSingleContactUs(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(CONTACTUS_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/contactUs/getcontactUswithid`, payload, config);

      dispatch(CONTACTUS_SUCCESS(data.data));

    } catch (error) {
      dispatch(CONTACTUS_FAIL(error.message));
    }
  };
}

export function addContactUs(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(CONTACTUS_REQUEST());

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(`/api/v1/contactUs/add`, payload, config);
      console.log("data------------>", data);
      dispatch(CONTACTUS_SUCCESS(data.data));

      toast.success('Data added successfully');

    } catch (error) {
      console.log("err---->", error);
      dispatch(CONTACTUS_FAIL(error.response.data.message));

      toast.error(error.response.data.message);
    }
  };
}

export function updateContactUs(editId, payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_CONTACTUS_REQUEST());

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      let endpoint = `/api/v1/contactUs/updatecontactUs?id=${editId}`;
      const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      dispatch(UPDATE_CONTACTUS_SUCCESS(data.data));

      toast.success(data.data.message);

    } catch (error) {
      dispatch(UPDATE_CONTACTUS_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function responseContactUs(responseId, payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_CONTACTUS_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/contactUs/responsecontactUs?id=${responseId}`;
      const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      dispatch(UPDATE_CONTACTUS_SUCCESS(data.data));

      toast.success(data.data.message);

    } catch (error) {
      dispatch(UPDATE_CONTACTUS_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function deleteContactUs(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(DELETE_CONTACTUS_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/contactUs/delete`;
      const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      console.log("data.data.type == SUCCESS-->", data.data.type == "SUCCESS");
      dispatch(DELETE_CONTACTUS_SUCCESS(data.type == "SUCCESS"));

      toast.success(data.data);

    } catch (error) {
      dispatch(DELETE_CONTACTUS_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function resetDeleteContactUs(payload) {
  return async (dispatch, getState) => {
    dispatch(DELETE_CONTACTUS_RESET());
  };
}