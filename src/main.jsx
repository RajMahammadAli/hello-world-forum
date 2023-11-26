import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Roots from "./Components/Roots/Roots.jsx";
import Home from "./Components/Home/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    children: [{ path: "/", element: <Home></Home> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
