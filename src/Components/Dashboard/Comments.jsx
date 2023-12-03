import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

const Comments = () => {
  const allPosts = useLoaderData();
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    axios
      .get(`https://hello-world-server-side.vercel.app/comments`)
      .then((response) => {
        const matchingComments = response.data.filter(
          (comment) => comment.postTitle === allPosts.postTitle
        );
        setComments(matchingComments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  const handleFeedbackChange = (index, feedback) => {
    const updateFeedback = {
      feedback: feedback,
      reported: true,
    };
    axios
      .put(
        `https://hello-world-server-side.vercel.app/comments/${index}`,
        updateFeedback
      )
      .then((response) => {
        console.log("role updated:", response.data.modifiedCount);
        if (response.data.modifiedCount > 0) {
          setComments(response.data);
        }
      })
      .catch((error) => {
        console.error("Error updating role:", error);
      });
  };

  const handleReportClick = (index) => {
    const updateFeedback = {
      feedback: comments[0].feedback,
      reported: false,
    };
    axios
      .put(
        `https://hello-world-server-side.vercel.app/comments/${index}`,
        updateFeedback
      )
      .then((response) => {
        console.log("role updated:", response.data.modifiedCount);
        if (response.data.modifiedCount > 0) {
          setComments(response.data);
        }
      })
      .catch((error) => {
        console.error("Error updating role:", error);
      });
  };

  const handleReadMoreClick = (comment) => {
    setSelectedComment(comment);
  };

  const closeModal = () => {
    setSelectedComment(null);
  };

  return (
    <>
      <Helmet>
        <title>Hello world | Comments</title>
      </Helmet>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Comments</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-md overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Comment Text</th>
                <th className="py-2 px-4">Feedback</th>
                <th className="py-2 px-4">Report</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{comment.commenterEmail}</td>
                  <td className="py-2 px-4">
                    {comment.comments.length > 20 ? (
                      <>
                        {comment.comments.substring(0, 20)}
                        {comment.comments.length > 20 ? "..." : ""}{" "}
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleReadMoreClick(comment)}
                        >
                          Read More
                        </button>
                      </>
                    ) : (
                      comment.comments
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <select
                      value={comment.feedback}
                      onChange={(e) =>
                        handleFeedbackChange(comment._id, e.target.value)
                      }
                      disabled={comment.feedback}
                      className="w-full p-2"
                    >
                      <option value="">Select Feedback</option>
                      <option value="Inappropriate">Inappropriate</option>
                      <option value="Spam">Spam</option>
                      <option value="Offensive">Offensive</option>
                    </select>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleReportClick(comment._id)}
                      className={
                        comment.reported ? "btn-danger" : "btn-disabled"
                      }
                    >
                      Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for displaying full comment */}
        {selectedComment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 max-w-lg mx-auto rounded-md">
              <p className="text-lg font-semibold mb-4">Full Comment</p>
              <p className="text-gray-700">{selectedComment.comments}</p>
              <button className="btn btn-primary mt-4" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Comments;
