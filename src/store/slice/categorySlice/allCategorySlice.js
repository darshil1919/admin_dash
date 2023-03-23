import { createSlice } from '@reduxjs/toolkit';
import statuses from '../../statuses';


const allCategorySlice = createSlice({
    name: 'allCategory',
    initialState: {
      status: statuses.SUCCESS,
      category: []
    },
    reducers: {
      setStatus: (state, action) => {
        state.status = action.payload
      },
      setAllCategory: (state, action) => {
        return{
          category: action.payload
        }
      },
      setErrorMsg: (state, action) => {
        state.error = action.payload
      },
      clearError: (state, action) => {
        state.error = null
      }
  }
});

export const { setStatus, setAllCategory, setErrorMsg, clearError } = allCategorySlice.actions;
export default allCategorySlice.reducer;
