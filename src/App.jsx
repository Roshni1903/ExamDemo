import React from "react";
import Login from "./component/Login";
import Register from "./component/Register";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
export default function App() {
  const router = createBrowserRouter([
    {
      element: <Login />,
      path: "/",
    },
    {
      element: <Register />,
      path: "/register",
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
