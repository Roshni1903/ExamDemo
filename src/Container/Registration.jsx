import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { updateData, setError, clearData } from "/src/Redux/RegisterSlice.jsx";
import { updateData, setError, clearData } from "../Redux/FormReducer";
import registerDesc from "/src/Description/registerDesc.js";
import instance from "/src/component/axiosInstance.jsx";
import usevalidate from "./commonContainer";
export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.formReducer.register.data);
  const error = useSelector((state) => state.formReducer.register.error);

  const submitData = async (data) => {
    try {
      const response = await instance({
        url: "users/SignUp",
        method: "POST",
        data,
      });
      if (response.data.message == "Email already exist") {
        toast.error("email already exists,enter other email", {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateData({ type: "register", name: name, value: value }));
    const error = usevalidate(name, value, registerDesc);
    dispatch(setError({ type: "register", error: error }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubmit = {};
    Object.entries(data).forEach(([name, value]) => {
      const submitError = usevalidate(name, value, registerDesc);
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

  return {
    data,
    error,
    handleChange,
    handleSubmit,
  };
}
