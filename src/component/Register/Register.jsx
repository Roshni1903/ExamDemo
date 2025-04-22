import React from "react";
import styles from "./register.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateData, setError, clearData } from "../Redux/RegisterSlice";
import { emailRegex, passRegex } from "../regex";
import instance from "./axiosInstance";
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.register.data);
  const error = useSelector((state) => state.register.error);
  const validate = (name, value) => {
    const error = {};
    switch (name) {
      case "name": {
        if (value.length <= 3 || value.length === 0) {
          error.nameError = "enter valid name";
        } else {
          error.nameError = "";
        }
        break;
      }
      case "email": {
        if (!emailRegex.test(value)) {
          error.emailError = "enter valid email";
        } else {
          error.emailError = "";
        }
        break;
      }
      case "password": {
        if (!passRegex.test(value)) {
          error.passwordError =
            "minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character is required";
        } else {
          error.passwordError = "";
        }

        break;
      }
      case "role": {
        if (value === "") {
          error.roleError = "select any one!";
        } else {
          error.roleError = "";
        }
        break;
      }
    }
    return error;
  };
  const submitData = async (data) => {
    try {
      await instance({
        url: "SignUp",
        method: "POST",
        data,
      }).then((response) => console.log(response));
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateData({ name: name, value: value }));
    const error = validate(name, value);
    dispatch(setError(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubmit = {};
    Object.entries(data).forEach(([name, value]) => {
      const submitError = validate(name, value);
      Object.assign(newSubmit, submitError);
    });
    dispatch(setError(newSubmit));
    const hasError = Object.values(newSubmit).some((element) => element !== "");
    if (hasError) {
      e.preventDefault();
    } else {
      submitData(data);
      dispatch(clearData());
    }
  };
  return (
    <div className={styles.flex}>
      <h1>Register Here</h1>
      <form className={styles.inner} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={(e) => handleChange(e)}
        />
        <ErrorContainer error={error.nameError} />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={data.email}
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <ErrorContainer error={error.emailError} />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={data.passwword}
          onChange={(e) => handleChange(e)}
        />
        <ErrorContainer error={error.passwordError} />

        <label htmlFor="role">Role</label>
        <select name="role" value={data.role} onChange={(e) => handleChange(e)}>
          <option value="">--select role--</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <ErrorContainer error={error.roleError} />

        <button className={styles.btn} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
const ErrorContainer = ({ error }) => {
  if (error) {
    return <span style={{ color: "red" }}>{error}</span>;
  } else {
    return null;
  }
};
