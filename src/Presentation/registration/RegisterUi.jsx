import React from "react";
import styles from "/src/Presentation/registration/register.module.css";
import commonContainer from "../../Container/commonContainer";
import FormUi from "../FormUi";
import { useNavigate } from "react-router-dom";
import registerDesc from "../../Description/registerDesc";
import { ToastContainer, toast } from "react-toastify";
import instance from "/src/component/axiosInstance.jsx";
import { setError, clearData } from "../../Redux/FormReducer";
import { useDispatch } from "react-redux";

export default function RegisterUi({ desc }) {
  const { data, error, handleChange, validate } = commonContainer(
    "register",
    registerDesc
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitData = async (data) => {
    try {
      const response = await instance({
        url: "users/SignUp",
        method: "POST",
        data,
      });
      if (response.data.message) {
        toast(response.data.message, {
          position: "top-center",
          autoClose: 1000,
        });
      } else {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubmit = {};
    Object.entries(data).forEach(([name, value]) => {
      const submitError = validate(name, value);
      Object.assign(newSubmit, submitError);
    });
    dispatch(setError({ type: "register", error: newSubmit }));
    const hasError = Object.values(newSubmit).some((element) => element !== "");
    if (hasError) {
      e.preventDefault();
    } else {
      submitData(data);
      dispatch(clearData({ type: "register" }));
    }
  };
  return (
    <div className={styles.flex}>
      <ToastContainer />
      <h1>Register Here</h1>

      <form onSubmit={(e) => handleSubmit(e)} className={styles.inner}>
        {desc.map((element) => {
          return FormUi(element, data, error, handleChange, handleSubmit);
        })}
        <button className={styles.btn} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
