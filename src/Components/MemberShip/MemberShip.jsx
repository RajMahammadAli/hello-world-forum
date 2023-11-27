import React, { useState } from "react";

const MembershipPage = () => {
  const [isMember, setIsMember] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);

  const handleMembershipPurchase = () => {
    // In a real-world scenario, you would integrate this with a payment gateway
    // and handle the payment process on the server side.
    // For demonstration purposes, we'll simply set the user as a member on the frontend.

    setIsMember(true);

    // Store information in MongoDB (this would typically be done on the server)
    const userInfo = {
      username: "JohnDoe", // Replace with actual username
      email: "john@example.com", // Replace with actual email
      status: selectedMembership,
    };

    // In a real scenario, you would make a request to your server to store this information in MongoDB
    console.log("Storing information in MongoDB:", userInfo);
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
    {
      type: "Premium",
      benefits: [
        "Access to premium features",
        "Silver Badge on your profile",
        "Up to 10 posts per day",
      ],
    },
    {
      type: "Silver",
      benefits: [
        "Basic features access",
        "Bronze Badge on your profile",
        "Up to 5 posts per day",
      ],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Membership Page
        </h2>

        {!isMember ? (
          <div>
            <p className="text-center mb-4">
              Choose your membership type and enjoy exclusive benefits:
            </p>

            {/* Membership Options */}
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

            {selectedMembership && (
              <div className="text-center mt-4">
                <button
                  onClick={handleMembershipPurchase}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                >
                  Purchase {selectedMembership} Membership
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-green-600 text-center">
            <h3 className="text-2xl font-semibold mb-2">
              Congratulations! You are now a {selectedMembership} member.
            </h3>
            <p>
              Thank you for becoming a member. Enjoy your {selectedMembership}{" "}
              Badge and enhanced posting privileges.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipPage;
