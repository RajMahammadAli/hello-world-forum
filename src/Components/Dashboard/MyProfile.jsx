import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { PiMedalFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import DisplayAboutMe from "./DisplayAboutMe";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState([]);
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    // Fetch posts when the component mounts
    axios
      .get(`http://localhost:5000/users?email=${user.email}`)
      .then((response) => {
        setDbUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);
  useEffect(() => {
    // Fetch posts when the component mounts
    axios
      .get(`http://localhost:5000/allPosts?email=${user.email}`)
      .then((response) => {
        setPosts(
          response.data
            .slice()
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        );
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

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
                  src={dbUser[0]?.image}
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
              <br /> {dbUser[0]?.name}
            </h1>
            <p className="text-lg text-gray-600 mb-2">{dbUser[0]?.email}</p>

            {/* Badge Section */}
            <div className="flex items-center mb-2">
              <span className="text-lg text-blue-500 mr-2">Badge: </span>

              {dbUser[0]?.badge === "Gold" && (
                <PiMedalFill className="text-orange-500 text-2xl"></PiMedalFill>
              )}
              {dbUser[0]?.badge === "Bronze" && (
                <PiMedalFill className="text-slate-500 text-2xl"></PiMedalFill>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-3xl font-bold">About me</h1>
              <Link
                className="btn-link border"
                to={`/dashboard/aboutme/${dbUser[0]?._id}`}
              >
                Edit
              </Link>
            </div>
            <div>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dbUser?.map((user) => (
                      <DisplayAboutMe
                        key={user._id}
                        user={user}
                      ></DisplayAboutMe>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <h2 className="text-2xl font-semibold mb-4">My Posts</h2>

            <div className="border-t-2 border-gray-200 py-4">
              {posts.slice(0, 3).map((post) => (
                <div key={post._id}>
                  <h3 className="text-lg font-medium mb-2">{post.postTitle}</h3>
                  <p className="text-gray-600">{post.postDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
