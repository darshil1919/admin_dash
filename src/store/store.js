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

import allCustomerSlice from './slice/customerSlice/allCustomerSlice';
import customerDetailsSlice from './slice/customerSlice/customerDetailsSlice';
import customerSlice from './slice/customerSlice/customerSlice';

import allWorkerSlice from './slice/workerSlice/allWorkerSlice';
import workerDetailsSlice from './slice/workerSlice/workerDetailsSlice';
import workerSlice from './slice/workerSlice/workerSlice';

import allOrderSlice from './slice/orderSlice/allOrderDetailSlice';
import orderDetailsSlice from './slice/orderSlice/orderDetailSlice';
import orderSlice from './slice/orderSlice/orderSlice';

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

        // customer slice
        allCustomer: allCustomerSlice,
        customerDetails: customerDetailsSlice,
        customer: customerSlice,

        // worker slice
        allWorker: allWorkerSlice,
        workerDetails: workerDetailsSlice,
        worker: workerSlice,

        // order slice
        allOrder: allOrderSlice,
        orderDetails: orderDetailsSlice,
        order: orderSlice,
    },
});

export default store;