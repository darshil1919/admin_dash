import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route, Navigate } from "react-router-dom";
import { Login } from "../../pages";
import Loader from "../Loader/Loader";

// const ProtectedRoute = ({component: Component, ...rest }) => {
//   const { loading, isAuthenticated, admin } = useSelector((state) => state.admin);
//   const navigate = useNavigate();

//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               // return <Redirect to="/login" />;
//             }

//             if (admin.role !== "admin") {
//               // return <Redirect to="/login" />;
//             }

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;

// const ProtectedRoute = ({ children }) => {
//   const { loading, isAuthenticated, admin } = useSelector((state) => state.admin);
//   const navigate = useNavigate();

//   return isAuthenticated ? children : <Navigate to="/login" />;
// }
// export default ProtectedRoute;

const ProtectedRoute = (props) => {
  const { Component } = props;
  const { loading, isAuthenticated } = useSelector((state) => state.admin);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if(!isAuthenticated){
  //     navigate("/login")
  //   }
  // }, [])

  if (loading) {
    return <Loader />
  } else {
    return isAuthenticated ? <Component /> : <Navigate to="/login" />
  }
}

export default ProtectedRoute;