import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

export default function AddPost() {
  const { user } = useContext(AuthContext);
  const [postCount, setPostCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const options = [
    { value: "Inspiration", label: "Inspiration" },
    { value: "Technology", label: "Technology" },
    { value: "Science", label: "Science" },
    { value: "Travel", label: "Travel" },
    { value: "Food and Cooking", label: "Food and Cooking" },
  ];

  const timestamp = new Date();

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const UserEmail = user?.email;

    // Convert formData to a plain object
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Accessing specific form field values
    const authorImage = formObject.image;
    const authorName = formObject.name;
    const authorEmail = formObject.email;
    const postTitle = formObject.title;
    const postDescription = formObject.description;
    const postUpVote = formObject.upvote;
    const postDownVote = formObject.downvote;
    const selectedValue = selectedOption ? selectedOption.value : null; // Replace with the actual name of your Select field

    console.log("Author Name:", authorName);
    console.log("Author image:", authorImage);
    console.log("Author Email:", authorEmail);
    console.log("Post Title:", postTitle);
    console.log("Post Description:", postDescription);
    console.log("Post upvote:", postUpVote);
    console.log("Post downvote:", postDownVote);
    console.log("Selected Option:", selectedValue);

    axios
      .post("http://localhost:5000/addPosts", {
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
      })
      .then((response) => {
        console.log("Assignment submitted successfully:", response.data);
        // Add any additional logic, such as showing a success message or redirecting
        toast.success("Assignment submitted successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting assignment:", error);
        // Handle error if needed
      });
  };

  useEffect(() => {
    // Hit an API to get the post count for the logged-in user
    // Replace 'API_URL' with the actual endpoint to get post count
    axios
      .get("API_URL")
      .then((response) => {
        setPostCount(response.data.postCount);
      })
      .catch((error) => {
        console.error("Error fetching post count:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <>
      <Helmet>
        <title>Hello world | AddPost</title>
      </Helmet>
      <div className="container mx-auto mt-8">
        <div className="flex justify-center items-center">
          <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Add Post</h1>
            {postCount >= 5 ? (
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
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="image"
                    placeholder="Author Image"
                    className="w-full input input-bordered"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Author Name"
                    className="w-full input input-bordered"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
