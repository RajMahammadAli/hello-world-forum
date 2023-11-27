// Import necessary dependencies
import React, { useContext, useState } from "react";

import { useForm } from "react-hook-form";

import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Component for the login and sign-up form
const LogIn = () => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const { user, userSignIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(user);

  // Dummy function to handle form submission
  const onSubmit = async (data) => {
    // Add logic to handle login here

    userSignIn(data.email, data.password)
      .then((result) => {
        toast("Log In Successful", {
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
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("Log In Successful", {
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
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <h1 className="text-center text-3xl font-bold">Login Now</h1>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && <span>Email field is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  })}
                />

                {errors.password?.type === "required" && (
                  <p>password is required</p>
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
                <button className="btn btn-primary">Login</button>
              </div>
            </form>

            <div className="flex flex-col w-full border-opacity-50">
              <div className="grid h-20 card  rounded-box place-items-center">
                <Link to="/register">Create a account, Register</Link>
              </div>
              <div className="divider">OR sign in with google</div>
              <div className="grid h-20 card  rounded-box place-items-center">
                <div
                  onClick={handleGoogleSignIn}
                  className="cursor-pointer text-center mt-2"
                >
                  <img
                    className="w-10 mx-auto"
                    src="https://i.ibb.co/hCFKf5k/google-icon-2048x2048-czn3g8x8-removebg-preview.png"
                    alt="Google Icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
