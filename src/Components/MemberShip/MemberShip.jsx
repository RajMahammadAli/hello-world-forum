import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const MembershipPage = () => {
  const { user } = useContext(AuthContext);
  const [isMember, setIsMember] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [dbUser, setDbUser] = useState([]);

  console.log(dbUser);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users?email=${user.email}`)
      .then((response) => {
        setDbUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post count:", error);
      });
  }, []);

  const handleMembershipPurchase = (id) => {
    // In a real-world scenario, you would integrate this with a payment gateway
    // and handle the payment process on the server side.
    // For demonstration purposes, we'll simply set the user as a member on the frontend.

    console.log(id);

    // Store information in MongoDB (this would typically be done on the server)
    const badgeInfo = {
      badge: "Gold",
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:5000/users/badgeInfo/${id}`, badgeInfo)
          .then((response) => {
            console.log(response.data);
            if (response.data.modifiedCount > 0) {
              setDbUser(response.data);
              Swal.fire({
                title: "Congratulations!",
                text: "Your file has been Updated.",
                icon: "success",
              });
              navigate("/");
            }
            navigate(location?.state ? location.state : "dashboard/addPost");
          })
          .catch((error) => {
            if (axios.isAxiosError(error) && error.response?.status === 403) {
              Swal.fire({
                title: "Access Denied",
                text: "You don't have permission to Update.",
                icon: "error",
              });
            } else {
              console.error("Error updating:", error);
            }
          });
      }
    });
  };

  const membershipOptions = [
    {
      type: "Gold",
      benefits: [
        "Access to premium features",
        "Gold Badge on your profile",
        "Unlimited posts",
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Hello world | MemberShip</title>
      </Helmet>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Membership Page
          </h2>

          <div className="flex flex-col space-y-4">
            {membershipOptions.map((membership) => (
              <div
                key={membership.type}
                className="border p-4 rounded-md transition duration-300 transform hover:shadow-md hover:scale-105 cursor-pointer"
                onClick={() => setSelectedMembership(membership.type)}
              >
                <h3 className="text-xl font-semibold mb-2">
                  {membership.type} Membership
                </h3>
                <ul className="list-disc list-inside">
                  {membership.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button
              onClick={() => handleMembershipPurchase(dbUser[0]._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Purchase Gold Membership
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembershipPage;
