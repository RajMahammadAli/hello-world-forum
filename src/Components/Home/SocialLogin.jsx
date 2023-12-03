import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

export default function () {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        axios
          .post("http://localhost:5000/users", {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
            role: "user",
            badge: "Bronze",
            isAdmin: false,
          })
          .then((response) => {
            console.log("Announcement submitted successfully:", response.data);
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
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
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
    </>
  );
}
