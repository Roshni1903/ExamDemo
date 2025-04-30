import React from "react";
export default function Profile() {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  return (
    <>
      <h1>Profile</h1>
      <h2>{name}</h2>
      <h2>{email}</h2>
    </>
  );
}
