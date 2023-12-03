import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function AddPost() {
  const { user } = useContext(AuthContext);
  const [postCount, setPostCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const navigate = useNavigate();

  console.log(isMember);

  const options = [
    { value: "Inspiration", label: "Inspiration" },
    { value: "Technology", label: "Technology" },
    { value: "Science", label: "Science" },
    { value: "Travel", label: "Travel" },
    { value: "Food and Cooking", label: "Food and Cooking" },
  ];

  console.log(postCount);

  const timestamp = new Date();

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    const authorImage = formObject.image;
    const authorName = formObject.name;
    const authorEmail = formObject.email;
    const postTitle = formObject.title;
    const postDescription = formObject.description;
    const postUpVote = formObject.upvote;
    const postDownVote = formObject.downvote;
    const selectedValue = selectedOption ? selectedOption.value : null;

    console.log("Author Name:", authorName);
    console.log("Author image:", authorImage);
    console.log("Author Email:", authorEmail);
    console.log("Post Title:", postTitle);
    console.log("Post Description:", postDescription);
    console.log("Post upvote:", postUpVote);
    console.log("Post downvote:", postDownVote);
    console.log("Selected Option:", selectedValue);

    axios
      .post("https://hello-world-server-side.vercel.app/addPosts", {
        authorImage,
        authorName,
        authorEmail,
        postTitle,
        postDescription,
        postUpVote,
        postDownVote,
        selectedValue,
        timestamp,
      })
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your post has been published",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting assignment:", error);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://hello-world-server-side.vercel.app/users?email=${user.email}`
      )
      .then((response) => {
        setUsers(response.data);

        setIsMember(response.data[0]?.badge === "Gold");
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://hello-world-server-side.vercel.app/allPosts?email=${user.email}`
      )
      .then((response) => {
        setPostCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching post count:", error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Hello world | AddPost</title>
      </Helmet>
      <div className="container mx-auto mt-8">
        <div className="flex justify-center items-center">
          <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Add Post</h1>
            {isMember || postCount < 5 ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="image"
                    defaultValue={user?.photoURL}
                    placeholder="Author Image"
                    className="w-full input input-bordered"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    defaultValue={user?.displayName}
                    placeholder="Author Name"
                    className="w-full input input-bordered"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    placeholder="Author Email"
                    className="w-full input input-bordered"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Post Title"
                    className="w-full input input-bordered"
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="description"
                    placeholder="Post Description"
                    className="w-full input input-bordered h-32"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    options={options}
                  />
                </div>
                <div className="mb-4 flex gap-4">
                  <div>
                    <label> UpVote</label>
                    <input
                      type="number"
                      name="upvote"
                      defaultValue="0"
                      min="0"
                      max="0"
                      className="w-full input input-bordered"
                      required
                    />
                  </div>
                  <div>
                    <label> DownVote</label>
                    <input
                      type="number"
                      name="downvote"
                      defaultValue="0"
                      min="0"
                      max="0"
                      className="w-full input input-bordered"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-success"
                  />
                </div>
              </form>
            ) : (
              <div>
                <p className="text-center text-gray-600">
                  You've reached the maximum number of allowed posts.
                </p>
                <p className="text-center">
                  Become a member to unlock more posting privileges.
                </p>
                <Link
                  to="/membership"
                  className="btn btn-success block mx-auto mt-4"
                >
                  Become a Member
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
