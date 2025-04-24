import React, { useState } from "react";
import styles from "./password.module.css";
import FormUi from "../FormUi";
import ForgetDesc from "../../Description/ForgetDesc";
import commonContainer from "../../Container/commonContainer";
import { ToastContainer } from "react-toastify";
export default function ForgetPasswordUi({ desc }) {
  const { data, error, handleChange, handleSubmit } = commonContainer(
    "forget",
    ForgetDesc
  );
  return (
    <div className={styles.flex}>
      <ToastContainer />
      <h1>Change password</h1>
      <form className={styles.inner}>
        {desc.map((element) => {
          return FormUi(element, data, error, handleChange);
        })}
        <button
          className={styles.btn}
          onClick={(e) => {
            handleSubmit(e);
          }}
          type="submit"
        >
          send mail
        </button>
      </form>
    </div>
  );
}
