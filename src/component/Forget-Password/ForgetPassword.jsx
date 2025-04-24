import React, { useState } from "react";
import styles from "./password.module.css";
export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    console.log(email);
  };
  return (
    <div className={styles.flex}>
      <h1>Change password</h1>
      <form className={styles.inner}>
        <b>
          <label htmlFor="email">Email</label>
        </b>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            handleChange(e);
          }}
          name="email"
        />
        <button className={styles.btn} type="submit">
          send mail
        </button>
        {/* <ErrorContainer error={error.emailError} /> */}
      </form>
    </div>
  );
}
