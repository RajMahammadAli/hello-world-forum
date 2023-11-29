import axios from "axios";
import { useEffect, useState } from "react";

export default function ({ post, handleAllPosts }) {
  const [comments, setComments] = useState([]);
  const formattedTime = new Date(post.timestamp).toLocaleString();

  //   const requiredComment = comments.find(
  //     (item) => item.postTitle === post.postTitle
  //   );

  useEffect(() => {
    axios
      .get(`http://localhost:5000/comments/${post.postTitle}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  console.log(comments);

  const uniquePostTitles = [...new Set(comments.map((item) => item.postTitle))];

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
          <p>Comment Count: </p>
          <p>Distinct PostTitles Count: {comments.length}</p>
        </div>
      </div>
    </>
  );
}
