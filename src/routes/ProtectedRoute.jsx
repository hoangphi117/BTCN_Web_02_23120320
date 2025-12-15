import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/auth";

const ProtectedRoute = ({ redirectTo = "/login" }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
