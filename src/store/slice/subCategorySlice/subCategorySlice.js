import { createSlice } from '@reduxjs/toolkit';

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState: {
    loading: false,
    subCategory: {}
  },
  reducers: {
    DELETE_SUBCATEGORY_REQUEST(state, action) { //1
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_SUBCATEGORY_REQUEST(state, action) { //2
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_SUBCATEGORY_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_SUBCATEGORY_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_SUBCATEGORY_FAIL(state, action){
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_SUBCATEGORY_FAIL(state, action){
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_SUBCATEGORY_RESET(state, action){
      return {
        ...state,
        isDeleted: false,
      };
    },
    UPDATE_SUBCATEGORY_RESET(state, action){
      return {
        ...state,
        isUpdated: false,
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

export default subCategorySlice.reducer;

export const {
  DELETE_SUBCATEGORY_REQUEST,
    UPDATE_SUBCATEGORY_REQUEST,
    DELETE_SUBCATEGORY_SUCCESS,
    UPDATE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAIL,
    UPDATE_SUBCATEGORY_FAIL,
    DELETE_SUBCATEGORY_RESET,
    UPDATE_SUBCATEGORY_RESET,
    CLEAR_ERRORS } = subCategorySlice.actions;