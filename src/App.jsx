import React from "react";
import DashBoard from "./component/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar/NavBar";
import RegisterUi from "/src/Presentation/registration/RegisterUi.jsx";
import registerDesc from "/src/Description/registerDesc.js";
import LoginUi from "./Presentation/login/LoginUi";
import loginDesc from "/src/Description/loginDesc.js";
import ForgetPassword from "./component/Forget-Password/ForgetPassword";
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
          <Route path="/forget-password" element={<ForgetPassword />}></Route>

          <Route path="/dashboard" element={<DashBoard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
