import React from "react";
import styles from "/src/Presentation/registration/register.module.css";
import Registration from "/src/Container/Registration.jsx";
import switchUi from "../../Container/switchUi";

export default function RegisterUi({ desc }) {
  const { data, error, handleChange, handleSubmit } = Registration();
  return (
    <div className={styles.flex}>
      <h1>Register Here</h1>

      <form onSubmit={(e) => handleSubmit(e)} className={styles.inner}>
        {desc.map((element) => {
          return switchUi(element, data, error, handleChange, handleSubmit);
        })}
        <button className={styles.btn} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

// if (element.type !== "select" && element.type !== "checkbox") {
//   return (
//     <>
//       <b>
//         <label key={element.label}>{element.label} </label>
//       </b>
//       <input
//         name={element.name}
//         type={element.type}
//         value={data[element.name]}
//         onChange={(e) => handleChange(e)}
//       ></input>
//       {error[element.name] ? (
//         <ErrorContainer error={error[element.name]} />
//       ) : null}
//     </>
//   );
// } else {
//   return (
// <>
//   <b>
//     <label>{element.label}</label>
//   </b>
//   <select name={element.name} onChange={(e) => handleChange(e)}>
//     {Object.entries(element.optionValue).map(([_, param]) => (
//       <option value={param.value}>{param.label}</option>
//     ))}
//   </select>
//   {error[element.name] ? (
//     <ErrorContainer error={error[element.name]} />
//   ) : null}
// </>
//   );
// }
