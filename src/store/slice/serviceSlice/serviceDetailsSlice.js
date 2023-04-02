import { createSlice } from '@reduxjs/toolkit';

const serviceDetailsSlice = createSlice({
  name: 'serviceDetails',
  initialState: {
    loading: false,
    service: {}
  },
  reducers: {
    SERVICE_REQUEST(state, action) { //1
      return {
        loading: true,
        service: {}
      };
    },
    SERVICE_SUCCESS(state, action) { //2
      return {
        loading: false,
        service: action.payload,
      };
    },
    SERVICE_FAIL(state, action) { //3
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

export default serviceDetailsSlice.reducer;

export const {
  SERVICE_REQUEST,
  SERVICE_SUCCESS,
  SERVICE_FAIL,
  CLEAR_ERRORS } = serviceDetailsSlice.actions;