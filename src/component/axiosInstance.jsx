import axios from "axios";
const instance = axios.create({
  baseURL: "https://examination.onrender.com/users/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
