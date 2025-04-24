import React from "react";
import { Link } from "react-router-dom";
import styles from "/src/component/NavBar/navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link className={styles.link} to="/">
        <button className={styles.btn}>Login </button>
      </Link>

      <Link className={styles.link} to="/register">
        <button className={styles.btn}> Register </button>
      </Link>
    </div>
  );
};

export default Navbar;
