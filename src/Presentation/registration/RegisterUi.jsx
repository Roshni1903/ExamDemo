import React from "react";
import styles from "/src/Presentation/registration/register.module.css";
import FormUi from "../FormUi";
import { ToastContainer } from "react-toastify";
import Register from "../../Container/Register";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";
export default function RegisterUi({ desc }) {
  const { loading, data, error, handleChange, validate, handleSubmit } =
    Register();

  return (
    <div className={styles.flex}>
      <ToastContainer />
      <div className={styles.con}>
        <div className={styles.left}>
          <h2>Welcome to our platform</h2>
          <p>Enter your details to register with us.</p>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className={styles.inner}>
          <h1>Register Here</h1>
          {desc.map((element) => {
            return FormUi(element, data, error, handleChange, handleSubmit);
          })}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <button className={styles.btn} type="submit" disabled={loading}>
              Register
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
