import { createSlice } from '@reduxjs/toolkit';

const allSubCategorySlice = createSlice({
  name: 'allSubCategory',
  initialState: {
    loading: false,
    allSubCategory: []
  },
  reducers: {
    ALL_SUBCATEGORY_REQUEST(state, action) { //1
      return {
        loading: true,
        allSubCategory: []
      };
    },
    ALL_SUBCATEGORY_SUCCESS(state, action) { //2
      return {
        loading: false,
        allSubCategory: action.payload,
      };
    },
    ALL_SUBCATEGORY_FAIL(state, action) { //3
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

export default allSubCategorySlice.reducer;

export const {
  ALL_SUBCATEGORY_REQUEST,
  ALL_SUBCATEGORY_SUCCESS,
  ALL_SUBCATEGORY_FAIL,
  CLEAR_ERRORS } = allSubCategorySlice.actions;