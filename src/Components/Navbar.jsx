import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function () {
  const { user, userLogOut } = useContext(AuthContext);
  const handleLogOut = () => {
    userLogOut();
  };
  const logo = `https://i.ibb.co/xG7j65Z/carlogo.png`;

  const navlinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/membership">MemberShip</Link>
      </li>
      <li>
        <Link>Notification</Link>
      </li>
      {user ? (
        <li>
          <Link onClick={handleLogOut}>Log Out</Link>
        </li>
      ) : (
        <li>
          <Link to="/login">Join Us</Link>
        </li>
      )}
    </>
  );
  return (
    <>
      <div className="container mx-auto">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navlinks}
              </ul>
            </div>
            <a>Hello World</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navlinks}</ul>
          </div>
          {user ? (
            <div className="navbar-end">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="user image" src={user?.photoURL} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <label
                    tabIndex={0}
                    className="flex justify-center avatar w-full mb-2"
                  >
                    <div className="w-10 rounded-full">
                      <img alt="user image" src={user?.photoURL} />
                    </div>
                  </label>
                  <li className="w-full text-center">{user?.displayName}</li>
                  <li>
                    <Link to="/dashboard/myProfile">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Log Out</button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
