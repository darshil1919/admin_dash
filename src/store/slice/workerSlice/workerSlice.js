import { createSlice } from '@reduxjs/toolkit';

const workerSlice = createSlice({
  name: 'worker',
  initialState: {
    loading: false,
    worker: {}
  },
  reducers: {
    DELETE_WORKER_REQUEST(state, action) { //1
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_WORKER_REQUEST(state, action) { //2
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_WORKER_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_WORKER_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_WORKER_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_WORKER_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_WORKER_RESET(state, action) {
      return {
        ...state,
        isDeleted: false,
      };
    },
    UPDATE_WORKER_RESET(state, action) {
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

export default workerSlice.reducer;

export const {
  DELETE_WORKER_REQUEST,
  UPDATE_WORKER_REQUEST,
  DELETE_WORKER_SUCCESS,
  UPDATE_WORKER_SUCCESS,
  DELETE_WORKER_FAIL,
  UPDATE_WORKER_FAIL,
  DELETE_WORKER_RESET,
  UPDATE_WORKER_RESET,
  CLEAR_ERRORS } = workerSlice.actions;