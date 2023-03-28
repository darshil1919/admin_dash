import { createSlice } from '@reduxjs/toolkit';


const allCategorySlice = createSlice({
    name: 'allCategory',
    initialState: {
      loading: true,
      category: []
    },
    reducers: {
      ALL_CATEGORY_REQUEST(state, action){ //1
        return {
          loading: true,
          category: []
        };
      },
      ALL_CATEGORY_SUCCESS(state, action){ //2
        return {
          loading: false,
          category: action.payload,
        }; 
      },
      ALL_CATEGORY_FAIL(state, action){ //3
        return {
          loading: false,
          error: action.payload,
        };
      },
      CLEAR_ERRORS(state, action){ //4
        return {
          ...state,
          error: null,
        };
      },
  }
});

export default allCategorySlice.reducer;

export const { 
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  CLEAR_ERRORS } = allCategorySlice.actions;