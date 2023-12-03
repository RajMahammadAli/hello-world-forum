import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function () {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get(`https://hello-world-server-side.vercel.app/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  const handleDeleteReport = (id) => {
    console.log("delete buttn clicked");

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
          .delete(`https://hello-world-server-side.vercel.app/comments/${id}`)
          .then((response) => {
            console.log(response.data);
            if (response.data.deletedCount > 0) {
              setComments(response.data);
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
      <div>
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Reports</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-md overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4">Commenter Email</th>
                  <th className="py-2 px-4">Comment Text</th>
                  <th className="py-2 px-4">Feedback</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments
                  ?.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map(
                    (comment, index) =>
                      // Only render the row if comment.feedback is not an empty string
                      comment.feedback !== "" && (
                        <tr key={index}>
                          <td className="py-2 px-4 text-center">
                            {comment.commenterEmail}
                          </td>
                          <td className="py-2 px-4 text-center">
                            {comment.comments}
                          </td>
                          <td className="py-2 px-4 text-center">
                            {comment.feedback}
                          </td>
                          <td className="py-2 px-4 text-center">
                            <button
                              onClick={() => handleDeleteReport(comment._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                  )}
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
                  currentPage === Math.ceil(comments.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
