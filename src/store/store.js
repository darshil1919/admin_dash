import { configureStore } from '@reduxjs/toolkit';

// category slice
import allCategorySlice from './slice/categorySlice/allCategorySlice';
import allSubCategorySlice from './slice/subCategorySlice/allSubCategorySlice';
import subCategorySlice from './slice/subCategorySlice/subCategorySlice';

const store = configureStore({
    reducer: {
        // category slice
        allCategory: allCategorySlice,
        allSubCategory: allSubCategorySlice,
        subCategory: subCategorySlice,
    },
});

export default store;