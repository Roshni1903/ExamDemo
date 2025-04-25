import React from "react";
import styles from "/src/Presentation/registration/register.module.css";
import FormUi from "../FormUi";
import { ToastContainer } from "react-toastify";
import Register from "../../Container/Register";
export default function RegisterUi({ desc }) {
  const { loading, data, error, handleChange, validate, handleSubmit } =
    Register();

  return (
    <div className={styles.flex}>
      <ToastContainer />
      <h1>Register Here</h1>

      <form onSubmit={(e) => handleSubmit(e)} className={styles.inner}>
        {desc.map((element) => {
          return FormUi(element, data, error, handleChange, handleSubmit);
        })}

        <button
          className={loading ? styles.disable : styles.btn}
          type="submit"
          disabled={loading}
        >
          {loading ? "loading.." : "Register"}
        </button>
      </form>
    </div>
  );
}
