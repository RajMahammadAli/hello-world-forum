import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalDbUsers, setTotalDbUser] = useState([]);
  console.log(posts.length);

  useEffect(() => {
    // Fetch posts when the component mounts
    axios
      .get(
        `https://hello-world-server-side.vercel.app/users?email=${user.email}`
      )
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
      .get(`https://hello-world-server-side.vercel.app/users`)
      .then((response) => {
        setTotalDbUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch posts when the component mounts
    axios
      .get("https://hello-world-server-side.vercel.app/allPosts")
      .then((response) => {
        const allPosts = response.data;
        setPosts(allPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);
  useEffect(() => {
    // Fetch posts when the component mounts
    axios
      .get("https://hello-world-server-side.vercel.app/comments")
      .then((response) => {
        const allPosts = response.data;
        setComments(allPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const data = {
    labels: ["No. of Posts", "NO. of Comments", "No. of Users"],
    datasets: [
      {
        label: "# of Votes",
        data: [posts.length, comments.length, totalDbUsers.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Hello world | MyProfile</title>
      </Helmet>
      <div className="container mx-auto mt-8 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
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
              Welcome to Admin profile,
              <br /> {dbUser[0]?.name}
            </h1>
            <p className="text-lg text-gray-600 mb-2">{user?.email}</p>

            {/* Badge Section */}
            <div className="flex items-center mb-2">
              <h1 className="text-lg text-blue-500 mr-2">
                Role: {dbUser[0]?.role}
              </h1>
            </div>
            {/* No. of post Section */}
            <div className="flex items-center mb-2">
              <h1 className="text-lg text-blue-500 mr-2">
                Total Posts: {posts.length}
              </h1>
            </div>
            {/* No. of comments Section */}
            <div className="flex items-center mb-2">
              <h1 className="text-lg text-blue-500 mr-2">
                Total Comments: {comments.length}
              </h1>
            </div>
            {/* No. of users Section */}
            <div className="flex items-center mb-2">
              <h1 className="text-lg text-blue-500 mr-2">
                Total users: {totalDbUsers.length}
              </h1>
            </div>
          </div>
          <div>
            <center>
              <Pie data={data} />
            </center>
          </div>
        </div>
        {/* Add tag */}
        <div className="w-full mt-10  grid justify-center">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <h2 className="text-2xl text-center font-semibold mb-4">
                Add Tags
              </h2>
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tags</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Add tags Here ...."
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Add Tag</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
