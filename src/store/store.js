import { configureStore } from '@reduxjs/toolkit';
import admineSlice from './slice/adminSlice/admineSlice';
import allCategorySlice from './slice/categorySlice/allCategorySlice';
import allSubCategorySlice from './slice/subCategorySlice/allSubCategorySlice';
import subCategorySlice from './slice/subCategorySlice/subCategorySlice';


const store = configureStore({
    reducer: {
        admin: admineSlice,

        // category slice
        allCategory: allCategorySlice,
        allSubCategory: allSubCategorySlice,
        subCategory: subCategorySlice,
    },
});

export default store;