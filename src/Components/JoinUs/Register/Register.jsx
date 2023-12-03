// Import necessary dependencies
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../Home/SocialLogin";

const image_hosting_key = import.meta.env.VITE_imageHosting_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// Component for the login and sign-up form
const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Dummy function to handle form submission
  const onSubmit = async (data) => {
    try {
      const file = data.img[0];
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const base64Data = reader.result.split(",")[1];

          const formData = new FormData();
          formData.append("image", base64Data);

          const response = await axios.post(image_hosting_api, formData, {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
            },
          });

          const imageUrl = response.data.data.url;

          console.log("Image URL:", imageUrl);

          // User creation logic
          createUser(data.email, data.password, data.name, imageUrl)
            .then(() => {
              axios
                .post("https://hello-world-server-side.vercel.app", {
                  name: data.name,
                  email: data.email,
                  image: imageUrl,
                  role: "user",
                  badge: "Bronze",
                  isAdmin: false,
                })
                .then((response) => {
                  console.log(
                    "Announcement submitted successfully:",
                    response.data
                  );
                  // Add any additional logic, such as showing a success message or redirecting
                  toast("Register Successful", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  navigate(location?.state ? location.state : "/");
                  window.location.reload();
                })
                .catch((error) => {
                  console.error("Error submitting announcement:", error);
                  // Handle error if needed
                });
            })
            .catch((error) => console.log(error));
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Hello world | Register</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <h1 className="text-center text-3xl font-bold">Register Now</h1>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
                {errors.name && <span>Name field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && <span>Email field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  {...register("img", { required: true })}
                />
                {errors.img && <span>Image field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  })}
                />

                {errors.password?.type === "required" && (
                  <p>Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p>Password must have at least 6 characters</p>
                )}

                {errors.password?.type === "pattern" && (
                  <p>
                    Password must have one lowercase letter, one uppercase
                    letter, one number, and one special character
                  </p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>

            <div className="flex flex-col w-full border-opacity-50">
              <div className="grid h-20 card  rounded-box place-items-center">
                <Link to="/login">Already Register? Log In</Link>
              </div>
              <div className="divider">OR sign in with google</div>
              <div className="grid h-20 card  rounded-box place-items-center">
                <SocialLogin></SocialLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
