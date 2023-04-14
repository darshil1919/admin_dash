import { createSlice } from '@reduxjs/toolkit';

const workerDetailsSlice = createSlice({
  name: 'workerDetails',
  initialState: {
    loading: false,
    worker: {}
  },
  reducers: {
    WORKER_REQUEST(state, action) { //1
      return {
        loading: true,
        worker: {}
      };
    },
    WORKER_SUCCESS(state, action) { //2
      return {
        loading: false,
        worker: action.payload,
      };
    },
    WORKER_FAIL(state, action) { //3
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

export default workerDetailsSlice.reducer;

export const {
  WORKER_REQUEST,
  WORKER_SUCCESS,
  WORKER_FAIL,
  CLEAR_ERRORS } = workerDetailsSlice.actions;