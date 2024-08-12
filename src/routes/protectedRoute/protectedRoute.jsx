import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { isAuthenticated, hasRole } from "../../utils/auth"; // Adjust the path to your utility file

const ProtectedRoute = ({ children, requiredRole, ...rest }) => {
  return isAuthenticated()&& hasRole(requiredRole) ? children : <Navigate to={"/"} />;
};

export default ProtectedRoute;
