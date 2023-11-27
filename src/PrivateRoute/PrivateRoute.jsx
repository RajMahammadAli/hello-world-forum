import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function ({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log("private", location.pathname);
  if (loading) {
    return (
      <>
        <div className="w-full flex justify-center items-center h-[200px]">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      </>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
}
