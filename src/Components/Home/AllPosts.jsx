import { useNavigate } from "react-router-dom";
import img from "../../assets/log.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import DisplayPosts from "./DisplayPosts";

export default function () {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  console.log(posts);

  useEffect(() => {
    // Fetch posts when the component mounts
    axios
      .get("http://localhost:5000/allPosts") // Update the URL with your server endpoint
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);
  const handleAllPosts = (id) => {
    console.log("go to All Post Details", id);
    navigate(`/postDetails/${id}`);
  };
  return (
    <>
      <div className="container mx-auto p-4 cursor-pointer">
        <div className="grid grid-cols-1  gap-4">
          {posts.map((post) => (
            <DisplayPosts
              key={post._id}
              post={post}
              handleAllPosts={handleAllPosts}
            ></DisplayPosts>
          ))}
        </div>
      </div>
    </>
  );
}
