import React from "react";
import { Link } from "react-router-dom";
import styles from "/src/component/NavBar/navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link className={styles.link} to="/">
        Login
      </Link>
      <Link className={styles.link} to="/register">
        Register
      </Link>
    </div>
  );
};

export default Navbar;
