import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function () {
  const loadedDbUsers = useLoaderData();
  console.log(loadedDbUsers._id);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const profession = form.profession.value;
    const education = form.education.value;
    const hobbies = form.hobbies.value;
    const description = form.description.value;

    const aboutMeInfo = {
      profession,
      education,
      hobbies,
      description,
    };

    axios
      .put(
        `https://hello-world-server-side.vercel.app/aboutMe/${loadedDbUsers._id}`,
        aboutMeInfo
      )
      .then((response) => {
        console.log("role updated:", response.data.modifiedCount);
        if (response.data.modifiedCount > 0) {
          navigate("/dashboard/myProfile");
        }
      })
      .catch((error) => {
        console.error("Error updating role:", error);
      });

    console.log(aboutMeInfo);
  };
  return (
    <>
      <h1 className="text-4xl font-bold text-center m-8">Edit myself</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="profession"
              defaultValue={loadedDbUsers?.profession}
              placeholder="Profession"
              className="w-full input input-bordered"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="education"
              defaultValue={loadedDbUsers?.education}
              placeholder="Educational Background"
              className="w-full input input-bordered"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="hobbies"
              defaultValue={loadedDbUsers?.hobbies}
              placeholder="Hobbies and Interests"
              className="w-full input input-bordered"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="description"
              defaultValue={loadedDbUsers?.description}
              placeholder="Write a few word about you"
              className="w-full input input-bordered"
              required
            />
          </div>

          <div className="mb-4">
            <input type="submit" value="Submit" className="btn btn-success" />
          </div>
        </form>
      </div>
    </>
  );
}
