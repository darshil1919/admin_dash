import { createSlice } from '@reduxjs/toolkit';


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
      loading: true,
      isAuthenticated: false
    },
    reducers: {
      LOGIN_REQUEST: (state, action) => {
        return {
          loading: true,
          isAuthenticated: false
        }
      },
      LOGIN_SUCCESS: (state, action) => {
        return{
          ...state,
          loading: false,
          isAuthenticated: true,
          admin: action.payload
        }
      },
      LOGIN_FAIL: (state, action) => {
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          admin: null,
          error: action.payload
        }
      },
      clearError: (state, action) => {
        return {
          ...state,
          error: null
        }
      }
  }
});

export const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, clearError } = adminSlice.actions;
export default adminSlice.reducer;
