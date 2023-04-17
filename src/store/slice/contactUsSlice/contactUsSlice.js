import { createSlice } from '@reduxjs/toolkit';

const contactUsSlice = createSlice({
  name: 'contactUs',
  initialState: {
    loading: false,
    contactUs: {}
  },
  reducers: {
    DELETE_CONTACTUS_REQUEST(state, action) { //1
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_CONTACTUS_REQUEST(state, action) { //2
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_CONTACTUS_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_CONTACTUS_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_CONTACTUS_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_CONTACTUS_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_CONTACTUS_RESET(state, action) {
      return {
        ...state,
        isDeleted: false,
      };
    },
    UPDATE_CONTACTUS_RESET(state, action) {
      return {
        ...state,
        isUpdated: false,
      };
    },
    CLEAR_ERRORS(state, action) { //4
      return {
        ...state,
        error: null,
      };
    },
  }
});

export default contactUsSlice.reducer;

export const {
  DELETE_CONTACTUS_REQUEST,
  UPDATE_CONTACTUS_REQUEST,
  DELETE_CONTACTUS_SUCCESS,
  UPDATE_CONTACTUS_SUCCESS,
  DELETE_CONTACTUS_FAIL,
  UPDATE_CONTACTUS_FAIL,
  DELETE_CONTACTUS_RESET,
  UPDATE_CONTACTUS_RESET,
  CLEAR_ERRORS } = contactUsSlice.actions;