import { Link } from "react-router-dom";

export default function () {
  const navLinks = (
    <>
      <li>
        <Link to="/adminDashboard/adminProfile">Admin Profile</Link>
      </li>
      <li>
        <Link to="/adminDashboard/manageUsers">Manage Users</Link>
      </li>
      <li>
        <Link to="/adminDashboard/reportedComments">Reported Comments</Link>
      </li>
      <li>
        <Link to="/adminDashboard/makeAnnouncement">Make Announcements</Link>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
    </>
  );
  return (
    <>
      <div>
        <div className="navbar bg-base-100 shadow-lg">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {navLinks}
              </ul>
            </div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
          </div>
        </div>
      </div>
    </>
  );
}
