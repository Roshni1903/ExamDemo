import React from "react";
import AdminDashboard from "../Teacher/AdminDashboard";
import StudentDashboard from "../Student/StudentDashboard";
import SideBar from "./SideBar";

export default function Dashboard({ role }) {
  return (
    <div>
      <SideBar role={role} />
      <div style={{ marginLeft: "240px" }}>
        {role === "teacher" ? <AdminDashboard /> : <StudentDashboard />}
      </div>
    </div>
  );
}
