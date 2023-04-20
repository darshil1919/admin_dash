import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    // _id: "",
    // title: "",
    // start: "",
    // end: "",
    // description: "",
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        loading: false,
        dashboard: []
    },
    reducers: {
        DASHBOARD_REQUEST(state, action) { //1
            return {
                loading: true,
                dashboard: {}
            };
        },
        DASHBOARD_SUCCESS(state, action) { //2
            return {
                loading: false,
                dashboard: action.payload,
            };
        },
        DASHBOARD_FAIL(state, action) { //3
            return {
                loading: false,
                error: action.payload,
            };
        },
        DASHBOARD_CLEAR(state, action) { //3
            return {
                loading: false,
                dashboard: {},
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

export default dashboardSlice.reducer;

export const {
    DASHBOARD_REQUEST,
    DASHBOARD_SUCCESS,
    DASHBOARD_FAIL,
    DASHBOARD_CLEAR,
    CLEAR_ERRORS } = dashboardSlice.actions;