import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    loading: false,
    order: {}
  },
  reducers: {
    DELETE_ORDER_REQUEST(state, action) { //1
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_ORDER_REQUEST(state, action) { //2
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_ORDER_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_ORDER_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_ORDER_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_ORDER_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_ORDER_RESET(state, action) {
      return {
        ...state,
        isDeleted: false,
      };
    },
    UPDATE_ORDER_RESET(state, action) {
      return {
        ...state,
        isUpdated: false,
      };
    },
    CLEAR_ERRORS(state, action) { 
      return {
        ...state,
        error: null,
      };
    },
  }
});

export default orderSlice.reducer;

export const {
  DELETE_ORDER_REQUEST,
  UPDATE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_RESET,
  UPDATE_ORDER_RESET,
  CLEAR_ERRORS } = orderSlice.actions;