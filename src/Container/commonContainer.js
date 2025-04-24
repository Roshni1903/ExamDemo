import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData, setError } from "../Redux/FormReducer";

const commonContainer = (formType, formArray) => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.formReducer?.[formType].data);
  const error = useSelector((state) => state.formReducer?.[formType].error);
  const validate = (name, value) => {
    const field = formArray.find((item) => item.name === name);
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

  // const submitData = async (data) => {
  //   // const url = formType === "register" ? "users/SignUp" : "users/Login";
  //   let url = "";
  //   if (formType === "register") {
  //     url = "users/SignUp";
  //   } else if (formType === "login") {
  //     url = "users/Login";
  //   } else if (formType === "forget") {
  //     url = "users/ForgotPassword";
  //   }
  //   try {
  //     const response = await instance({
  //       url: url,
  //       method: "POST",
  //       data,
  //     });
  //     if (response.data.message) {
  //       toast(response.data.message, {
  //         position: "top-center",
  //         autoClose: 1000,
  //       });
  //     } else {
  //       formType === "register" ? navigate("/") : navigate("/dashboard");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateData({ type: formType, name: name, value: value }));
    const error = validate(name, value);
    dispatch(setError({ type: formType, error: error }));
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newSubmit = {};
  //   Object.entries(data).forEach(([name, value]) => {
  //     const submitError = validate(name, value);
  //     Object.assign(newSubmit, submitError);
  //   });
  //   dispatch(setError({ type: formType, error: newSubmit }));
  //   const hasError = Object.values(newSubmit).some((element) => element !== "");
  //   if (hasError) {
  //     e.preventDefault();
  //   } else {
  //     submitData(data);
  //     dispatch(clearData({ type: formType }));
  //   }
  // };
  return {
    data,
    error,
    handleChange,
    validate,
  };
};

export default commonContainer;
