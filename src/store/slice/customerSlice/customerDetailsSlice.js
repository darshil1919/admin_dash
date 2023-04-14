import { createSlice } from '@reduxjs/toolkit';

const customerDetailsSlice = createSlice({
  name: 'customerDetails',
  initialState: {
    loading: false,
    customer: {}
  },
  reducers: {
    CUSTOMER_REQUEST(state, action) { //1
      return {
        loading: true,
        customer: {}
      };
    },
    CUSTOMER_SUCCESS(state, action) { //2
      return {
        loading: false,
        customer: action.payload,
      };
    },
    CUSTOMER_FAIL(state, action) { //3
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

export default customerDetailsSlice.reducer;

export const {
  CUSTOMER_REQUEST,
  CUSTOMER_SUCCESS,
  CUSTOMER_FAIL,
  CLEAR_ERRORS } = customerDetailsSlice.actions;