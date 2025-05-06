import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!role) {
      return <Navigate to="/login" />;
    }
  }, [role]);

  if (role === "teacher") {
    return <Navigate to="/teacher/dashboard" />;
  } else if (role === "student") {
    return <Navigate to="/student/dashboard" />;
  }

  return <Navigate to="/login" />;
};

export default Dashboard;
