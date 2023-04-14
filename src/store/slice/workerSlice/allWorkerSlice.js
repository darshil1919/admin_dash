import { createSlice } from '@reduxjs/toolkit';

const allWorkerSlice = createSlice({
  name: 'allWorker',
  initialState: {
    loading: false,
    allWorker: []
  },
  reducers: {
    ALL_WORKER_REQUEST(state, action) { //1
      return {
        loading: true,
        allWorker: []
      };
    },
    ALL_WORKER_SUCCESS(state, action) { //2
      return {
        loading: false,
        allWorker: action.payload,
      };
    },
    ALL_WORKER_FAIL(state, action) { //3
      return {
        loading: false,
        error: action.payload,
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

export default allWorkerSlice.reducer;

export const {
  ALL_WORKER_REQUEST,
  ALL_WORKER_SUCCESS,
  ALL_WORKER_FAIL,
  CLEAR_ERRORS } = allWorkerSlice.actions;