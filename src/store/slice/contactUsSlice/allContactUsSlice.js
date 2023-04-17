import { createSlice } from '@reduxjs/toolkit';

const allContactUsSlice = createSlice({
  name: 'allContactUs',
  initialState: {
    loading: false,
    allContactUs: []
  },
  reducers: {
    ALL_CONTACTUS_REQUEST(state, action) { //1
      return {
        loading: true,
        allContactUs: []
      };
    },
    ALL_CONTACTUS_SUCCESS(state, action) { //2
      return {
        loading: false,
        allContactUs: action.payload,
      };
    },
    ALL_CONTACTUS_FAIL(state, action) { //3
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

export default allContactUsSlice.reducer;

export const {
  ALL_CONTACTUS_REQUEST,
  ALL_CONTACTUS_SUCCESS,
  ALL_CONTACTUS_FAIL,
  CLEAR_ERRORS } = allContactUsSlice.actions;