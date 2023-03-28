import { configureStore } from '@reduxjs/toolkit';
import admineSlice from './slice/adminSlice/admineSlice';
import allCategorySlice from './slice/categorySlice/allCategorySlice';


const store = configureStore({
    reducer: {
        admin: admineSlice,

        // category slice
        allCategory: allCategorySlice
    },
});

export default store;