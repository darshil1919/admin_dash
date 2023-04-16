import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    // _id: "",
    // title: "",
    // start: "",
    // end: "",
    // description: "",
}

const allOrderDetailSlice = createSlice({
    name: 'allOrder',
    initialState: {
        loading: false,
        allOrder: []
    },
    reducers: {
        ALL_ORDER_REQUEST(state, action) { //1
            return {
                loading: true,
                allOrder: [],
            };
        },
        ALL_ORDER_SUCCESS(state, action) { //2
            return {
                loading: false,
                allOrder: action.payload,
            };
        },
        ALL_ORDER_FAIL(state, action) { //3
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

export default allOrderDetailSlice.reducer;

export const {
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    CLEAR_ERRORS } = allOrderDetailSlice.actions;