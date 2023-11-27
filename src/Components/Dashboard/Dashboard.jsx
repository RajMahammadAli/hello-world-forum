import { Link, Outlet } from "react-router-dom";

export default function () {
  return (
    <>
      <div className="container mx-auto">
        <div>
          <div className="w-full items-center p-4 flex flex-col justify-center lg:justify-between">
            <h1>Dashboard</h1>
            <div className="space-x-4">
              <Link to="/dashboard/myProfile">My Profile</Link>
              <Link to="/dashboard/addPost">Add Posts</Link>
              <Link to="/dashboard/myPosts">My Posts</Link>
            </div>
          </div>
          <div className="container mx-auto">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}