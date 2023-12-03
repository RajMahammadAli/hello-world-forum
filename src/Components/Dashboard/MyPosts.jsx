import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import DisplayMyPosts from "./DisplayMyPosts";
import Swal from "sweetalert2";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  console.log(userPosts);

  useEffect(() => {
    // Fetch user posts from the server
    axios
      .get(
        `https://hello-world-server-side.vercel.app/allPosts?email=${user.email}`
      )
      .then((response) => {
        setUserPosts(response.data); // Assuming the response contains an array of user's posts
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
      });
  }, []);

  const handleDelete = (id) => {
    console.log("dashboard comments delete button clicked", id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://hello-world-server-side.vercel.app/allPosts/${id}`)
          .then((response) => {
            console.log(response.data);
            if (response.data.deletedCount > 0) {
              setUserPosts(response.data);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            if (axios.isAxiosError(error) && error.response?.status === 403) {
              Swal.fire({
                title: "Access Denied",
                text: "You don't have permission to delete this assignment.",
                icon: "error",
              });
            } else {
              console.error("Error deleting assignments:", error);
            }
          });
      }
    });
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <Helmet>
        <title>Hello world | MyPosts</title>
      </Helmet>
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
            {userPosts
              ?.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((post) => (
                <DisplayMyPosts
                  key={post._id}
                  post={post}
                  handleDelete={handleDelete}
                ></DisplayMyPosts>
              ))}
          </tbody>
        </table>

        <div className="flex justify-center my-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(userPosts.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default MyPosts;
