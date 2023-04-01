import { configureStore } from '@reduxjs/toolkit';
import admineSlice from './slice/adminSlice/admineSlice';
import allCategorySlice from './slice/categorySlice/allCategorySlice';
import newCategorySlice from './slice/categorySlice/newCategorySlice';
import categorySlice from './slice/categorySlice/categorySlice';

import allSubCategorySlice from './slice/subCategorySlice/allSubCategorySlice';
import subCategoryDetailsSlice from './slice/subCategorySlice/subCategoryDetailsSlice';
import subCategorySlice from './slice/subCategorySlice/subCategorySlice';

import allServiceSlice from './slice/serviceSlice/allServiceSlice';
import serviceDetailsSlice from './slice/serviceSlice/serviceDetailsSlice';
import serviceSlice from './slice/serviceSlice/serviceSlice';

const store = configureStore({
    reducer: {
        admin: admineSlice,

        // category slice
        allCategory: allCategorySlice,
        newCategory: newCategorySlice,
        category: categorySlice,

        // subCategory slice
        allSubCategory: allSubCategorySlice,
        subCategoryDetails: subCategoryDetailsSlice,
        subCategory: subCategorySlice,

        // service slice
        allService: allServiceSlice,
        serviceDetails: serviceDetailsSlice,
        service: serviceSlice,
    },
});

export default store;