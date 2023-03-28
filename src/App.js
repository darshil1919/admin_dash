import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Footer, Sidebar } from "./components";
import { Ecommerce, Orders, Employees, Customers, Category, Login, Error, Dashboard } from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
// import Category from './pages/Category';

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    // <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
      <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Ecommerce />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/category" element={<Category />} />
                </Route>
                <Route path="*" element={<Error />} />
              </Routes>
        {/* <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div>
                  <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar />
                  </div>
              
            </div>
            <Footer />
          </div>
        </div> */}
      </BrowserRouter>
    // </div>
  );
};

export default App;
