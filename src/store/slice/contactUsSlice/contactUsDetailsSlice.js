import { createSlice } from '@reduxjs/toolkit';

const contactUsDetailsSlice = createSlice({
  name: 'contactUsDetails',
  initialState: {
    loading: false,
    contactUs: {}
  },
  reducers: {
    CONTACTUS_REQUEST(state, action) { //1
      return {
        loading: true,
        contactUs: {}
      };
    },
    CONTACTUS_SUCCESS(state, action) { //2
      return {
        loading: false,
        contactUs: action.payload,
      };
    },
    CONTACTUS_FAIL(state, action) { //3
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

export default contactUsDetailsSlice.reducer;

export const {
  CONTACTUS_REQUEST,
  CONTACTUS_SUCCESS,
  CONTACTUS_FAIL,
  CLEAR_ERRORS } = contactUsDetailsSlice.actions;