import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Ecommerce, Orders, Employees, Customers, Category, Login, Error, Dashboard, SubCategory, AddSubCategory } from "./pages";
import "./App.css";

const App = () => {

  return (
      <BrowserRouter>
      <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Ecommerce />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/category" element={<Category />} />
                  <Route exact path="/sub-category" element={<SubCategory />} />
                  <Route exact path={"/sub-category/add-subcategory"} element={<AddSubCategory />} />
                  <Route exact path={"/sub-category/edit-subcategory/:id"} element={<AddSubCategory />} />
                </Route>
                <Route path="*" element={<Error />} />
              </Routes>         
      </BrowserRouter>
  );
};

export default App;
