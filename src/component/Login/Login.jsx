import React from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../Redux/LoginSlice";
export default function Login() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.login.data);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateData({ name: name, value: value }));
    console.log(data);
  };
  const handleSubmit = (e) => {};
  return (
    <>
      <div className={styles.flex}>
        <h1>Login</h1>
        <form className={styles.inner}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button className={styles.btn}>Login</button>
        </form>
        <Link to="/register">
          <p>New User?Register</p>
        </Link>
      </div>
    </>
  );
}
