const usevalidate = (name, value, formType) => {
  const field = formType.find((item) => item.name === name);
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
export default usevalidate;
