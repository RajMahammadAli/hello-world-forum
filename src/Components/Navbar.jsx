import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import { TfiAnnouncement } from "react-icons/tfi";

export default function () {
  const { user, userLogOut } = useContext(AuthContext);
  const [announcementlength, setAnnouncementLength] = useState([]);
  const [dbUser, setDbUser] = useState([]);

  const logo = `https://i.ibb.co/DVJ3CFG/talk-Trove2.png`;

  console.log(dbUser.role);

  useEffect(() => {
    axios
      .get(`https://hello-world-server-side.vercel.app`)
      .then((response) => {
        const userByEmail = response.data.find(
          (item) => item.email === user?.email
        );

        if (userByEmail) {
          setDbUser(userByEmail);
        } else {
          console.warn("User not found in response data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user?.email]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/announcement`)
      .then((response) => {
        setAnnouncementLength(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  const handleLogOut = () => {
    userLogOut();
  };

  const navlinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/membership">Membership</Link>
      </li>
      <li>
        <button className="btn">
          <TfiAnnouncement />
          <div className="badge badge-secondary">
            {announcementlength.length}
          </div>
        </button>
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
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost">
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
            <Link to="/" className="lg:hidden">
              <img src={logo} alt="Logo" className="w-8 h-8" />
            </Link>
            <div>
              <img className="w-28 hidden lg:block" src={logo} />
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navlinks}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="navbar-end">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
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
                      <Link to="/dashboard/myProfile">User Dashboard</Link>
                    </li>
                    {dbUser.role === "admin" && (
                      <li>
                        <Link to="/adminDashboard/adminProfile">
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
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
      </div>
    </>
  );
}
