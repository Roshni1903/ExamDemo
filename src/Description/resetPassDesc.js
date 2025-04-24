import { passRegex } from "../component/regex";

const resetPassDesc = [
  {
    label: "Enter New Password",
    name: "password",
    type: "password",
    validation: [
      {
        regex: passRegex,
        errormsg:
          "minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character is required",
      },
    ],
  },
];

export default resetPassDesc;
