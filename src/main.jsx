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
import PostDetails from "./Components/PostDetails/PostDetails.jsx";
import AdminDashBoard from "./Components/AdminDashBoard/AdminDashBoard.jsx";
import ManageUsers from "./Components/AdminDashBoard/ManageUsers.jsx";
import AdminProfile from "./Components/AdminDashBoard/AdminProfile.jsx";
import ReportedComments from "./Components/AdminDashBoard/ReportedComments.jsx";
import MakeAnnouncement from "./Components/AdminDashBoard/MakeAnnouncement.jsx";
import AboutMe from "./Components/Dashboard/AboutMe.jsx";
import MakeAdmin from "./MakeAdmin/MakeAdmin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/login", element: <LogIn></LogIn> },
      { path: "/register", element: <Register></Register> },
      {
        path: "/postDetails/:id",
        element: <PostDetails></PostDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allPosts/${params.id}`),
      },

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
        path: "comments/:id",
        element: (
          <PrivateRoute>
            <Comments></Comments>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allPosts/${params.id}`),
      },
      {
        path: "aboutme/:id",
        element: (
          <PrivateRoute>
            <AboutMe></AboutMe>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.id}`),
      },
    ],
  },
  {
    path: "/adminDashboard",
    element: (
      <PrivateRoute>
        <AdminDashBoard></AdminDashBoard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "manageUsers",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "adminProfile",
        element: (
          <PrivateRoute>
            <MakeAdmin>
              <AdminProfile></AdminProfile>
            </MakeAdmin>
          </PrivateRoute>
        ),
      },
      {
        path: "reportedComments",
        element: (
          <PrivateRoute>
            <ReportedComments></ReportedComments>
          </PrivateRoute>
        ),
      },
      {
        path: "makeAnnouncement",
        element: (
          <PrivateRoute>
            <MakeAnnouncement></MakeAnnouncement>
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
