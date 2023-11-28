import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Roots from "./Components/Roots/Roots.jsx";
import Home from "./Components/Home/Home.jsx";
import LogIn from "./Components/JoinUs/LogIn/LogIn.jsx";
import Register from "./Components/JoinUs/Register/Register.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import MembershipPage from "./Components/MemberShip/MemberShip.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import MyProfile from "./Components/Dashboard/MyProfile.jsx";
import AddPost from "./Components/Dashboard/AddPost.jsx";
import MyPosts from "./Components/Dashboard/MyPosts.jsx";
import Comments from "./Components/Dashboard/Comments.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/login", element: <LogIn></LogIn> },
      { path: "/register", element: <Register></Register> },

      {
        path: "/memberShip",
        element: (
          <PrivateRoute>
            <MembershipPage></MembershipPage>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "addPost",
        element: (
          <PrivateRoute>
            <AddPost></AddPost>
          </PrivateRoute>
        ),
      },
      {
        path: "myPosts",
        element: (
          <PrivateRoute>
            <MyPosts></MyPosts>
          </PrivateRoute>
        ),
      },
      {
        path: "comments",
        element: (
          <PrivateRoute>
            <Comments></Comments>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={router}></RouterProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);
