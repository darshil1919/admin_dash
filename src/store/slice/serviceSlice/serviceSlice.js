import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    loading: false,
    service: {}
  },
  reducers: {
    DELETE_SERVICE_REQUEST(state, action) { //1
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_SERVICE_REQUEST(state, action) { //2
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_SERVICE_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_SERVICE_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_SERVICE_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_SERVICE_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_SERVICE_RESET(state, action) {
      return {
        ...state,
        isDeleted: false,
      };
    },
    UPDATE_SERVICE_RESET(state, action) {
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

export default serviceSlice.reducer;

export const {
  DELETE_SERVICE_REQUEST,
  UPDATE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
  UPDATE_SERVICE_FAIL,
  DELETE_SERVICE_RESET,
  UPDATE_SERVICE_RESET,
  CLEAR_ERRORS } = serviceSlice.actions;