import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    loading: false,
    customer: {}
  },
  reducers: {
    DELETE_CUSTOMER_REQUEST(state, action) { //1
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_CUSTOMER_REQUEST(state, action) { //2
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_CUSTOMER_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_CUSTOMER_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_CUSTOMER_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_CUSTOMER_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_CUSTOMER_RESET(state, action) {
      return {
        ...state,
        isDeleted: false,
      };
    },
    UPDATE_CUSTOMER_RESET(state, action) {
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

export default customerSlice.reducer;

export const {
  DELETE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_RESET,
  UPDATE_CUSTOMER_RESET,
  CLEAR_ERRORS } = customerSlice.actions;