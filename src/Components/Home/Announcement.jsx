import React from "react";
import { Helmet } from "react-helmet-async";

const Announcement = () => {
  return (
    <>
      <Helmet>
        <title>Your Site Name | Announcement</title>
      </Helmet>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Announcement</h1>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Important Announcement</h2>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            eleifend ante et sagittis commodo. Duis tincidunt, nisi at
            scelerisque vulputate, mi sem fermentum justo, nec fringilla turpis
            turpis vel nunc.
          </p>
          <p className="text-gray-700 mb-4">
            Nullam varius sodales sollicitudin. Ut bibendum orci sit amet
            gravida sollicitudin. Mauris venenatis nisl in odio gravida, at
            ullamcorper urna fermentum.
          </p>
          <p className="text-gray-700 mb-4">
            Quisque vulputate tellus ac sem euismod, et congue augue cursus.
            Curabitur sodales urna eu ex finibus, in varius velit sollicitudin.
          </p>
        </div>
      </div>
    </>
  );
};

export default Announcement;
