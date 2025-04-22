import React from "react";
import Login from "./component/Login";
import Register from "./component/Register";
import DashBoard from "./component/Dashboard";
import {
  BrowserRouter,
  createBrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Navbar from "./component/NavBar";
export default function App() {
  // const router = createBrowserRouter([
  //   {
  //     element: <Login />,
  //     path: "/",
  //   },
  //   {
  //     element: <Register />,
  //     path: "/register",
  //   },
  //   {
  //     element: <DashBoard />,
  //     path: "/dashboard",
  //   },
  // ]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
    </>
  );
}
