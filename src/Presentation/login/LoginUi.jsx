import React from "react";
import Login from "../../Container/Login";
import styles from "/src/Presentation/login/login.module.css";
import { Link } from "react-router-dom";
import switchUi from "../../Container/switchUi";
export default function LoginUi({ desc }) {
  const { data, error, handleChange, handleSubmit } = Login();

  return (
    <div className={styles.flex}>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.inner}>
        {desc.map((element) => {
          return switchUi(element, data, error, handleChange, handleSubmit);
        })}
        <button type="submit" className={styles.btn}>
          Login
        </button>
        <div className="links">
          <p>
            <Link to="/forget-password">forget password</Link>
          </p>
          <p>
            Need an account?<Link to="/register">signup</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
