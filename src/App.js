import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Ecommerce, Orders, Employees, Customers, Category, Login, Error, Dashboard, SubCategory, AddSubCategory, Service, AddService } from "./pages";
import "./App.css";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { loadAdmin } from "./store/action/adminAction";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, admin } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(loadAdmin());
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<ProtectedRoute Component={Ecommerce} />}>
          <Route exact path="/" element={<Dashboard />} />
          {/* <Route path="/" element={<ProtectedRoute Component={Dashboard} />} /> */}
          {/* <ProtectedRoute
          // exact
          path="/"
          component={Dashboard}
        /> */}
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/employees" element={<Employees />} />
          <Route exact path="/customers" element={<Customers />} />
          <Route exact path="/category" element={<Category />} />
          <Route exact path="/sub-category" element={<SubCategory />} />
          <Route exact path="/sub-category/add-subcategory" element={<AddSubCategory />} />
          <Route exact path="/sub-category/edit-subcategory/:id" element={<AddSubCategory />} />
          <Route exact path="/service" element={<Service />} />
          <Route exact path="/service/add-service" element={<AddService />} />
          <Route exact path="/service/edit-service/:id" element={<AddService />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
