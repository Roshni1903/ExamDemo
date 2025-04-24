import React, { useState } from "react";
import styles from "./resetPass.module.css";
import FormUi from "../FormUi";
import commonContainer from "../../Container/commonContainer";
import resetPassDesc from "../../Description/ResetPassDesc";
export default function ResetPasswordUi({ desc }) {
  const { data, error, handleChange, handleSubmit } = commonContainer(
    "reset",
    resetPassDesc
  );

  return (
    <div className={styles.flex}>
      <h1>set new password</h1>
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
          Reset Password
        </button>
      </form>
    </div>
  );
}
