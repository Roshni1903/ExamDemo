import React from "react";
import { Link } from "react-router-dom";

export default function AdminProfile() {
  // const name = localStorage.getItem("name");
  // const email = localStorage.getItem("email");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
        padding: "20px",
      }}
    >
      <h2>Profile</h2>
      <p>Name: Admin</p>
      <Link to="/reset-password">
        <button>Change Password</button>
      </Link>
    </div>
  );
}
