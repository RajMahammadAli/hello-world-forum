import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DisplayPosts from "./DisplayPosts";

export default function () {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posts when the component mounts
    axios
      .get("https://hello-world-server-side.vercel.app/allPosts")
      .then((response) => {
        const allPosts = response.data;
        setPosts(
          allPosts
            .slice()
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        );
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleAllPosts = (id, title) => {
    console.log("go to All Post Details", id, title);
    navigate(`/postDetails/${id}`);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container mx-auto p-4 cursor-pointer">
        <div>
          <button className="btn btn-success my-6">Popular Posts</button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {currentPosts.map((post) => (
            <DisplayPosts
              key={post._id}
              post={post}
              handleAllPosts={handleAllPosts}
            ></DisplayPosts>
          ))}
        </div>
        <div className="mt-4">
          <nav>
            <ul className="pagination flex gap-4">
              {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(
                (number) => (
                  <li key={number + 1} className="page-item">
                    <button
                      onClick={() => paginate(number + 1)}
                      className="page-link btn btn-success"
                    >
                      {number + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
