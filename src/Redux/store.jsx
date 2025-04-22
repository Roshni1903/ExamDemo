import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./RegisterSlice";
import LoginSlice from "./LoginSlice";

const store = configureStore({
  reducer: {
    register: RegisterSlice,
    login: LoginSlice,
  },
});
export default store;
