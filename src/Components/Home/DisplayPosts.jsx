import axios from "axios";
import { useEffect, useState } from "react";

export default function ({ post, handleAllPosts }) {
  const [comments, setComments] = useState([]);
  const formattedTime = new Date(post.timestamp).toLocaleString();

  useEffect(() => {
    axios
      .get(`https://hello-world-server-side.vercel.app/comments`)
      .then((response) => {
        const matchingComments = response.data.filter(
          (comment) => comment.postTitle === post.postTitle
        );

        setComments(matchingComments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        // Add UI or logging for error handling
      });
  }, []);

  return (
    <>
      <div
        onClick={() => handleAllPosts(post._id)}
        className="card card-side w-full bg-base-100 shadow-xl"
      >
        <div className="avatar p-4">
          <div className="w-24 h-24 rounded-full">
            <img src={post.authorImage} alt="Author" />
          </div>
        </div>

        <div className="card-body">
          <h2 className="card-title">{post.postTitle}</h2>
          <p>{post.postDescription}</p>
          <p>{post.selectedValue}</p>

          <p>Time of Post: {formattedTime}</p>
          <p>Comment Count: {comments.length}</p>
        </div>
      </div>
    </>
  );
}
