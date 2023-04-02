import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    loading: false,
    category: {}
  },
  reducers: {
    DELETE_CATEGORY_REQUEST(state, action) { //1
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_CATEGORY_REQUEST(state, action) { //2
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_CATEGORY_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_CATEGORY_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_CATEGORY_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_CATEGORY_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_CATEGORY_RESET(state, action) {
      return {
        ...state,
        isDeleted: false,
      };
    },
    UPDATE_CATEGORY_RESET(state, action) {
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

export default categorySlice.reducer;

export const {
  DELETE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
  CLEAR_ERRORS } = categorySlice.actions;