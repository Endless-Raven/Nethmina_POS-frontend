import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { data } = useSelector((state) => state.user);
  return data ? <Outlet /> : <Navigate to="/login" />;
}
