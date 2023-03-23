import { configureStore } from '@reduxjs/toolkit';

// category slice
import allCategorySlice from './slice/categorySlice/allCategorySlice';

const store = configureStore({
    reducer: {
        // category slice
        allCategory: allCategorySlice
    },
});

export default store;