import React from "react";
import styles from "./login.module.css";
// import { Link } from "react-router-dom";
export default function Login() {
  return (
    <>
      <div className={styles.flex}>
        <h1>Login</h1>
        <form className={styles.inner}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <button className={styles.btn}>Login</button>
        </form>
        {/* <Link to="/register">New User?Register</Link> */}
      </div>
    </>
  );
}
