import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "/src/component/axiosInstance.jsx";
import { Link } from "react-router-dom";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get("student/getStudentDetail", {
          headers: {
            "access-token": token,
          },
        });
        const { name, email, role } = response.data.data;
        setProfile({ name: name, email: email, role: role });
        setLoading(false);
      } catch (e) {
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 1000,
        });
        setLoading(false);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);
  // const name = localStorage.getItem("name");
  // const email = localStorage.getItem("email");

  return (
    <>
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
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
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
          <Link to="/edit-profile">
            <button>edit Profile</button>
          </Link>
          <Link to="/reset-password">
            <button>Change Password</button>
          </Link>
        </div>
      )}
    </>
  );
}
