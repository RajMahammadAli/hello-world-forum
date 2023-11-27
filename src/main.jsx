import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Roots from "./Components/Roots/Roots.jsx";
import Home from "./Components/Home/Home.jsx";
import LogIn from "./Components/JoinUs/LogIn/LogIn.jsx";
import Register from "./Components/JoinUs/Register/Register.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "login", element: <LogIn></LogIn> },
      { path: "register", element: <Register></Register> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
