import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    // _id: "",
    // title: "",
    // start: "",
    // end: "",
    // description: "",
}

const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        loading: false,
        orderDetail: []
    },
    reducers: {
        ORDER_REQUEST(state, action) { //1
            return {
                loading: true,
                orderDetail: {}
            };
        },
        ORDER_SUCCESS(state, action) { //2
            return {
                loading: false,
                orderDetail: action.payload,
            };
        },
        ORDER_FAIL(state, action) { //3
            return {
                loading: false,
                error: action.payload,
            };
        },
        ORDER_CLEAR(state, action) { //3
            return {
                loading: false,
                orderDetail: {},
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

export default orderDetailSlice.reducer;

export const {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL,
    ORDER_CLEAR,
    CLEAR_ERRORS } = orderDetailSlice.actions;