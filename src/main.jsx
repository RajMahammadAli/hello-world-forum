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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/login", element: <LogIn></LogIn> },
      { path: "/register", element: <Register></Register> },
      { path: "/memberShip", element: <MembershipPage></MembershipPage> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      { path: "myProfile", element: <MyProfile></MyProfile> },
      { path: "addPost", element: <AddPost></AddPost> },
      { path: "myPosts", element: <MyPosts></MyPosts> },
      { path: "comments", element: <Comments></Comments> },
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
