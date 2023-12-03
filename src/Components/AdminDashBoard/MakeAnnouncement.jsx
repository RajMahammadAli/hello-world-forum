import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";

export default function () {
  const { user } = useContext(AuthContext);

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const authorImage = form.authorImage.value;
    const authorName = form.authorName.value;
    const title = form.title.value;
    const description = form.description.value;

    const announcementInfo = {
      authorImage,
      authorName,
      title,
      description,
    };
    console.log("hello announcement", announcementInfo);

    axios
      .post("http://localhost:5000/announcement", announcementInfo)
      .then((response) => {
        console.log("Announcement submitted successfully:", response.data);
        // Add any additional logic, such as showing a success message or redirecting
        toast.success("Announcement submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting announcement:", error);
        // Handle error if needed
      });
  };
  return (
    <>
      <div>
        <div>
          <h1 className="text-3xl text-center font-bold m-8">
            Make AnnounceMent
          </h1>
        </div>
        <div className="w-full flex justify-center">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleAnnouncementSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Author Image</span>
                </label>
                <input
                  type="text"
                  placeholder="AutherImage"
                  name="authorImage"
                  defaultValue={user?.photoURL}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Author Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Auther Name"
                  name="authorName"
                  defaultValue={user?.displayName}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  type="textarea"
                  placeholder="description"
                  name="description"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
