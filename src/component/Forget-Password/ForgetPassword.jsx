import React, { useState } from "react";
import styles from "./password.module.css";
export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    console.log(value);
  };
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          handleChange(e);
        }}
        name="email"
      />
      <button type="submit">send mail</button>
      {/* <ErrorContainer error={error.emailError} /> */}
    </div>
  );
}
