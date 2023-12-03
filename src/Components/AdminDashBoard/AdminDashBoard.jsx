import { Helmet } from "react-helmet-async";
import { Link, Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function () {
  return (
    <>
      <Helmet>
        <title>Hello world | Admin Dashboard</title>
      </Helmet>
      <div className="container mx-auto">
        <div>
          <div>
            <AdminNavbar></AdminNavbar>
          </div>

          <div className="container mx-auto">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}
