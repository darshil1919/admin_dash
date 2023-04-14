import { createSlice } from '@reduxjs/toolkit';

const allCustomerSlice = createSlice({
  name: 'allCustomer',
  initialState: {
    loading: false,
    allCustomer: []
  },
  reducers: {
    ALL_CUSTOMER_REQUEST(state, action) { //1
      return {
        loading: true,
        allCustomer: []
      };
    },
    ALL_CUSTOMER_SUCCESS(state, action) { //2
      return {
        loading: false,
        allCustomer: action.payload,
      };
    },
    ALL_CUSTOMER_FAIL(state, action) { //3
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

export default allCustomerSlice.reducer;

export const {
  ALL_CUSTOMER_REQUEST,
  ALL_CUSTOMER_SUCCESS,
  ALL_CUSTOMER_FAIL,
  CLEAR_ERRORS } = allCustomerSlice.actions;