import { useLoaderData, useNavigate } from "react-router-dom";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { CiShare2 } from "react-icons/ci";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";

import { FacebookShareButton } from "react-share";
export default function () {
  const { user } = useContext(AuthContext);
  const postById = useLoaderData();
  const [upVoteCount, setUpVoteCount] = useState(
    parseInt(postById.postUpVote) || 0
  );
  const [downVoteCount, setDownVoteCount] = useState(
    parseInt(postById.postDownVote) || 0
  );
  const navigate = useNavigate();

  const {
    _id,
    authorImage,
    authorName,
    authorEmail,
    postTitle,
    postDescription,
    postUpVote,
    postDownVote,
    selectedValue,
    UserEmail,
    timestamp,
  } = postById;
  const formattedTime = new Date(timestamp).toLocaleString();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const comments = form.comment.value;

    axios
      .post("http://localhost:5000/comments", {
        postTitle,
        comments,
      })
      .then((response) => {
        console.log("comments submitted successfully:", response.data);
        // Add any additional logic, such as showing a success message or redirecting
        toast.success("Comments submitted successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting comments:", error);
        // Handle error if needed
      });
  };

  const handleUpVote = () => {
    console.log("up vote clicked");

    // Update the MongoDB database with the new upVoteCount
    const updatedUpVoteData = {
      postUpVote: upVoteCount + 1,
    };

    axios
      .put(`http://localhost:5000/allPosts/${_id}`, updatedUpVoteData)
      .then((response) => {
        console.log("Update successful");
        // Use the updated count from the server response
        setUpVoteCount((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        // Handle error, if needed
      });
  };

  const handleDownVote = () => {
    console.log("down vote clicked");

    // Update the MongoDB database with the new downVoteCount
    const updatedDownVoteData = {
      postDownVote: downVoteCount + 1,
    };

    axios
      .put(`http://localhost:5000/allPosts/${_id}`, updatedDownVoteData)
      .then((response) => {
        console.log("Update successful");
        // Use the updated count from the server response
        setDownVoteCount((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        // Handle error, if needed
      });
  };

  const shareUrl = `http://localhost:5173/postDetails/${_id}`;

  return (
    <>
      <div className="container mx-auto">
        <div className="card mx-auto w-96 lg:w-full lg:card-side glass">
          <figure className="lg:w-80">
            <img src={authorImage} alt="author image" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{authorName}</h2>
            <h2 className="card-title">{postTitle}</h2>
            <p>{postDescription}</p>
            <div className="lg:flex gap-2 justify-start items-center">
              <h2 className="card-title">{selectedValue}</h2>
              <h2 className="card-title">{formattedTime}</h2>
              <h2 className="card-title" onClick={handleUpVote}>
                <BiSolidUpvote />
                {upVoteCount}
              </h2>
              <h2 className="card-title" onClick={handleDownVote}>
                <BiSolidDownvote />
                {downVoteCount}
              </h2>
              <h2 className="card-title">
                <FacebookShareButton url={shareUrl}>
                  <CiShare2 />
                </FacebookShareButton>
              </h2>
            </div>
          </div>
        </div>
        <div>
          <div>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Comment</span>
                </label>
                <input
                  type="textarea"
                  name="comment"
                  placeholder="Comments here..."
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control w-20 mt-6">
                <button disabled={!user?.email} className="btn btn-primary">
                  comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
