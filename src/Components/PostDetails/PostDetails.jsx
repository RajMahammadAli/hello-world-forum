import { useLoaderData, useNavigate } from "react-router-dom";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { CiShare2 } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";

import { FacebookShareButton } from "react-share";
export default function () {
  const { user } = useContext(AuthContext);
  const postById = useLoaderData();
  const [likeCount, setLikeCount] = useState(parseInt(postById.postUpVote));
  const [dislikeCount, setDislikeCount] = useState(
    parseInt(postById.postDownVote)
  );
  const [activeBtn, setActiveBtn] = useState("none");

  const navigate = useNavigate();

  console.log(user?.email);

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

    const commentsInfo = {
      postTitle: postTitle,
      comments: comments,
      commenterEmail: user?.email,
      feedback: "",
      reported: false,
    };

    axios
      .post("https://hello-world-server-side.vercel.app/comments", commentsInfo)
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

  const shareUrl = `http://localhost:5173/postDetails/${_id}`;

  const sendReactionDataToServer = async (like, dislike) => {
    try {
      const response = await axios.put(
        `https://hello-world-server-side.vercel.app/allPosts/vote/${_id}`,
        {
          postUpVote: like,
          postDownVote: dislike,
          usersId: [_id],
        }
      );

      // Handle the server response if needed
      console.log(response.data);
    } catch (error) {
      // Handle the error
      console.error("Error sending data to server:", error);
    }
  };

  const handleReactionClick = (reaction) => {
    if (activeBtn === "none") {
      if (reaction === "like") {
        setActiveBtn("like");
        setLikeCount((prev) => prev + 1);
        sendReactionDataToServer(likeCount + 1, dislikeCount);
      } else if (reaction === "dislike") {
        setActiveBtn("dislike");
        setDislikeCount((prev) => prev + 1);
        sendReactionDataToServer(likeCount, dislikeCount + 1);
      }
    } else if (activeBtn === reaction) {
      if (reaction === "like") {
        setLikeCount((prev) => prev - 1);
        sendReactionDataToServer(likeCount - 1, dislikeCount);
      } else if (reaction === "dislike") {
        setDislikeCount((prev) => prev - 1);
        sendReactionDataToServer(likeCount, dislikeCount - 1);
      }
      setActiveBtn("none");
    } else if (activeBtn !== reaction) {
      if (reaction === "like") {
        setLikeCount((prev) => prev + 1);
        setDislikeCount((prev) => prev - 1);
        sendReactionDataToServer(likeCount + 1, dislikeCount - 1);
        setActiveBtn("like");
      } else if (reaction === "dislike") {
        setDislikeCount((prev) => prev + 1);
        setLikeCount((prev) => prev - 1);
        sendReactionDataToServer(likeCount - 1, dislikeCount + 1);
        setActiveBtn("dislike");
      }
    }
  };

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
              <h2
                className="card-title"
                onClick={() => handleReactionClick("like")}
              >
                <BiSolidUpvote />
                {likeCount}
              </h2>
              <h2
                className="card-title"
                onClick={() => handleReactionClick("dislike")}
              >
                <BiSolidDownvote />
                {dislikeCount}
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
