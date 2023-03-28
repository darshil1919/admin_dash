import { createSlice } from '@reduxjs/toolkit';

const subCategoryDetailsSlice = createSlice({
  name: 'subCategoryDetails',
  initialState: {
    loading: false,
    subCategory: {}
  },
  reducers: {
    SUBCATEGORY_REQUEST(state, action) { //1
      return {
        loading: true,
        subCategory: {}
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
    CLEAR_ERRORS(state, action) { //4
      return {
        ...state,
        error: null,
      };
    },
  }
});

export default subCategoryDetailsSlice.reducer;

export const {
  SUBCATEGORY_REQUEST,
  SUBCATEGORY_SUCCESS,
  SUBCATEGORY_FAIL,
  CLEAR_ERRORS } = subCategoryDetailsSlice.actions;