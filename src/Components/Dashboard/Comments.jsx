import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const Comments = () => {
  const [comments, setComments] = useState([
    {
      email: "ali.rc.raj@gmail.com",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      feedback: "",
      reported: false,
    },
    // Add more comments as needed
  ]);

  const [selectedComment, setSelectedComment] = useState(null);

  const handleFeedbackChange = (index, feedback) => {
    const updatedComments = [...comments];
    updatedComments[index].feedback = feedback;
    setComments(updatedComments);
  };

  const handleReportClick = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].reported = true;
    setComments(updatedComments);
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
                <tr
                  key={index}
                  className={comment.reported ? "bg-red-200" : ""}
                >
                  <td className="py-2 px-4">{comment.email}</td>
                  <td className="py-2 px-4">
                    {comment.text.length > 20 ? (
                      <>
                        {comment.text.substring(0, 20)}
                        {comment.text.length > 20 ? "..." : ""}{" "}
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleReadMoreClick(comment)}
                        >
                          Read More
                        </button>
                      </>
                    ) : (
                      comment.text
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <select
                      value={comment.feedback}
                      onChange={(e) =>
                        handleFeedbackChange(index, e.target.value)
                      }
                      disabled={comment.reported}
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
                      onClick={() => handleReportClick(index)}
                      disabled={comment.reported}
                      className={`btn ${
                        comment.reported ? "btn-disabled" : "btn-danger"
                      }`}
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
              <p className="text-gray-700">{selectedComment.text}</p>
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
