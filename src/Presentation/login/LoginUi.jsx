import React from "react";
import Login from "../../Container/Login";
import styles from "/src/Presentation/login/login.module.css";
import { Link } from "react-router-dom";
export default function LoginUi({ desc }) {
  const { data, error, handleChange, handleSubmit } = Login();
  console.log(data);
  return (
    <div className={styles.flex}>
      <h1>Login</h1>

      <form onSubmit={(e) => handleSubmit(e)} className={styles.inner}>
        {desc.map((element) => {
          if (element.type !== "select" && element.type !== "checkbox") {
            return (
              <>
                <b>
                  <label key={element.label}>{element.label} </label>
                </b>
                <input
                  name={element.name}
                  type={element.type}
                  value={data?.[name]}
                  onChange={(e) => handleChange(e)}
                ></input>
                {error[element.name] ? (
                  <ErrorContainer error={error[element.name]} />
                ) : null}
              </>
            );
          } else {
            return (
              <>
                <b>
                  <label>{element.label}</label>
                </b>
                <select name={element.name} onChange={(e) => handleChange(e)}>
                  {Object.entries(element.optionValue).map(([_, param]) => (
                    <option value={param.value}>{param.label}</option>
                  ))}
                </select>
                {error[element.name] ? (
                  <ErrorContainer error={error[element.name]} />
                ) : null}
              </>
            );
          }
        })}
        <button
          type="submit"
          // onSubmit={(e) => handleSubmit(e)}
          className={styles.btn}
        >
          Login
        </button>
        <div className="links">
          <p>
            <Link to="/forget-password">forget password</Link>
          </p>
          <p>
            Need an account?<Link to="/register">signup</Link>
          </p>
        </div>
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
