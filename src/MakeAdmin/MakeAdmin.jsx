import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const location = useLocation();
  console.log("private", location.pathname);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://hello-world-server-side.vercel.app?email=${user.email}`)
        .then((response) => {
          const userByEmail = response.data[0]; // Assuming user data is an array

          if (userByEmail) {
            setDbUser(userByEmail);
          } else {
            console.warn("User not found in response data.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user?.email]);

  if (loading || dbUser === null) {
    return (
      <div className="w-full flex justify-center items-center h-[200px]">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (dbUser?.role === "admin") {
    return children;
  }

  return <Navigate state={location.pathname} to="/" />;
}
