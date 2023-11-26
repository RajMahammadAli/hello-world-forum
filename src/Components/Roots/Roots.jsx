import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

export default function () {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    </>
  );
}
