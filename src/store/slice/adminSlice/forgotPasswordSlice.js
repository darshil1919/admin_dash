import { createSlice } from '@reduxjs/toolkit';


const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
      loading: false,
    },
    reducers: {
      FORGOT_PASSWORD_REQUEST(state, action){ //1
        return {
          ...state,
          loading: true,
          error: null
        };  
      },
      RESET_PASSWORD_REQUEST(state, action){ //2
        return {
          ...state,
          loading: true,
        };  
      },
      FORGOT_PASSWORD_SUCCESS(state, action){ //3
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      },
      RESET_PASSWORD_SUCCESS(state, action){ //4
        return {
          ...state,
          loading: false,
          success: action.payload,
        };
      },
      FORGOT_PASSWORD_FAIL(state, action){ //5
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
      RESET_PASSWORD_FAIL(state, action){ //6
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
      CLEAR_ERRORS(state, action){ //7
        return {
          ...state,
          error: null,
        };
      },
  }
});

export default forgotPasswordSlice.reducer;

export const { 
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_FAIL,
  CLEAR_ERRORS } = forgotPasswordSlice.actions;