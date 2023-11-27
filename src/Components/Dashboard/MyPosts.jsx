import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyPosts = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // Fetch user posts from the server
    axios
      .get("API_ENDPOINT_TO_GET_USER_POSTS")
      .then((response) => {
        setUserPosts(response.data); // Assuming the response contains an array of user's posts
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Posts</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border-b p-2">Post Title</th>
            <th className="border-b p-2">Number of Votes</th>
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b p-2 text-center">title</td>
            <td className="border-b p-2 text-center">votes</td>
            <td className="border-b p-2 grid gap-4 justify-center">
              {/* <Link to={`/comments/${post._id}`} className="btn btn-info mr-2">
                Comments
              </Link> */}
              <Link to={`/comments/`} className="btn btn-info mr-2">
                Comments
              </Link>
              <button className="btn btn-danger" onClick={() => handleDelete()}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyPosts;
