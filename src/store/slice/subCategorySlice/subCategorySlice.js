import { createSlice } from '@reduxjs/toolkit';

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState: {
    loading: true,
    subCategory: []
  },
  reducers: {
    SUBCATEGORY_REQUEST(state, action) { //1
      return {
        loading: true,
        subCategory: []
      };
    },
    SUBCATEGORY_SUCCESS(state, action) { //2
      return {
        loading: false,
        subCategory: action.payload,
      };
    },
    SUBCATEGORY_FAIL(state, action) { //3
      return {
        loading: false,
        error: action.payload,
      };
    },
    SUBCATEGORY_CLEAR_ERRORS(state, action) { //4
      return {
        ...state,
        error: null,
      };
    },
  }
});

export default subCategorySlice.reducer;

export const {
  SUBCATEGORY_REQUEST,
  SUBCATEGORY_SUCCESS,
  SUBCATEGORY_FAIL,
  SUBCATEGORY_CLEAR_ERRORS } = subCategorySlice.actions;