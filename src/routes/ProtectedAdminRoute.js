import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Protects admin routes by checking adminToken in localStorage
 */
export const ProtectedAdminRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem("adminToken");
  return isAdminAuthenticated ? (
    children
  ) : (
    <Navigate to="/login/admin" replace />
  );
};

/**
 * Protects owner routes by checking token and role in localStorage
 */
export const ProtectedOwnerRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return token && role === "OWNER" ? (
    children
  ) : (
    <Navigate to="/owner-login" replace />
  );
};
