import { createSlice } from '@reduxjs/toolkit';

const newCategorySlice = createSlice({
  name: 'newCategory',
  initialState: {
    loading: false,
    newCategory: []
  },
  reducers: {
    NEW_CATEGORY_REQUEST(state, action) { //1
      return {
        loading: true,
        newCategory: []
      };
    },
    NEW_CATEGORY_SUCCESS(state, action) { //2
      return {
        loading: false,
        newCategory: action.payload,
      };
    },
    NEW_CATEGORY_FAIL(state, action) { //3
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

export default newCategorySlice.reducer;

export const {
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  CLEAR_ERRORS } = newCategorySlice.actions;