import React from "react";
import DashBoard from "./component/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar/NavBar";
import RegisterUi from "/src/Presentation/registration/RegisterUi.jsx";
import registerDesc from "/src/Description/registerDesc.js";
import LoginUi from "./Presentation/login/LoginUi";
import loginDesc from "/src/Description/loginDesc.js";
import ForgetDesc from "./Description/ForgetDesc";
import ForgetPasswordUi from "./Presentation/ForgetPassword/ForgetPasswordUi";
import ResetPasswordUi from "./Presentation/ResetPassword/ResetPasswordUi";
import resetPassDesc from "./Description/ResetPassDesc";
export default function App() {
  return (
    <>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<LoginUi desc={loginDesc} />}></Route>
          <Route
            path="/register"
            element={<RegisterUi desc={registerDesc} />}
          ></Route>
          <Route
            path="/forget-password"
            element={<ForgetPasswordUi desc={ForgetDesc} />}
          ></Route>
          <Route
            path="/newPassword"
            element={<ResetPasswordUi desc={resetPassDesc} />}
          ></Route>

          <Route path="/dashboard" element={<DashBoard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
