import { Helmet } from "react-helmet-async";
import { Link, Outlet } from "react-router-dom";
import UsersNavbar from "./UsersNavbar";

export default function () {
  return (
    <>
      <Helmet>
        <title>Hello world | Dashboard</title>
      </Helmet>
      <div className="container mx-auto">
        <div>
          <UsersNavbar></UsersNavbar>
        </div>
        <div className="container mx-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
