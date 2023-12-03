import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Announcement = () => {
  const [announcement, setAnnouncement] = useState([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    axios
      .get("http://localhost:5000/announcement")
      .then((response) => {
        setAnnouncement(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);
  return (
    <>
      <Helmet>
        <title>Hello world | Announcement</title>
      </Helmet>
      {announcement.length === 0 ? (
        ""
      ) : (
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Announcement</h1>
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Important Announcement</h2>

            {announcement.map((announce) => (
              <ul className="p-4" key={announce._id}>
                {" "}
                <li className="list-disc">{announce.description}</li>
              </ul>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Announcement;
