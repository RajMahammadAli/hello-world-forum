import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Helmet>
        <title>Hello world | MyProfile</title>
      </Helmet>
      <div className="container mx-auto mt-8 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
          {/* Avatar */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 text-center">
            <div className="avatar w-24 mx-auto mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                <img
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h1 className="text-3xl font-bold mb-2">
              Welcome to my profile,
              <br /> {user?.displayName}
            </h1>
            <p className="text-lg text-gray-600 mb-2">{user?.email}</p>

            {/* Badge Section */}
            <div className="flex items-center mb-2">
              <span className="text-lg text-blue-500 mr-2">
                Badge: {user?.badge || "No Badge"}
              </span>
              {/* Add badge icons or images here based on your badge data */}
              {/* For example: */}
              {user?.badge === "Gold" && (
                <img
                  src="gold-badge-image-url"
                  alt="Gold Badge"
                  className="w-6 h-6"
                />
              )}
              {user?.email === "Bronze" && (
                <img
                  src="silver-badge-image-url"
                  alt="Silver Badge"
                  className="w-6 h-6"
                />
              )}
              {/* Add more conditions for other badges */}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <h2 className="text-2xl font-semibold mb-4">3 Recent Posts</h2>
            {/* Add your recent posts section here */}
            {/* For example: */}
            <div className="border-t-2 border-gray-200 py-4">
              <h3 className="text-lg font-medium mb-2">Post Title 1</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet...</p>
            </div>
            <div className="border-t-2 border-gray-200 py-4">
              <h3 className="text-lg font-medium mb-2">Post Title 2</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet...</p>
            </div>
            <div className="border-t-2 border-gray-200 py-4">
              <h3 className="text-lg font-medium mb-2">Post Title 3</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
