import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { updateData, setError, clearData } from "/src/Redux/RegisterSlice.jsx";
import { updateData, setError, clearData } from "../Redux/FormReducer";
import registerDesc from "/src/Description/registerDesc.js";
import instance from "/src/component/axiosInstance.jsx";
export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.formReducer.register.data);
  const error = useSelector((state) => state.formReducer.register.error);
  // const [Data, setData] = useState({});
  const validate = (name, value) => {
    const field = registerDesc.find((item) => item.name === name);
    const errors = {};
    if (field && field.validation) {
      for (const check of field.validation) {
        if (check.regex && !check.regex.test(value)) {
          errors[name] = check.errormsg;
          break;
        } else {
          errors[name] = "";
        }
        if (check.validlength && value.length < check.validlength) {
          errors[name] = check.errormsg;
          break;
        }
        if (field.type === "select" && value === "") {
          errors[name] = check.errormsg;
          break;
        }
      }
    }
    return errors;
  };

  const submitData = async (data) => {
    try {
      await instance({
        url: "users/SignUp",
        method: "POST",
        data,
      }).then((response) => {
        console.log(response);
        if (response.data.message == "Email already exist") {
          toast.error("email already exists,enter other email", {
            position: "top-center",
            autoClose: 1000,
          });
        } else {
          navigate("/");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setData((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
    dispatch(updateData({ type: "register", name: name, value: value }));
    const error = validate(name, value);
    dispatch(setError({ type: "register", error: error }));
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

  return {
    data,
    error,
    validate,
    handleChange,
    handleSubmit,
  };
}
