import axios from "axios";
import { useEffect, useState } from "react";
import DisplayManageUsers from "./DisplayManageUsers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function () {
  const [dbUser, setDbUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  console.log(dbUser);

  useEffect(() => {
    // Fetch posts when the component mounts
    axios
      .get(`https://hello-world-server-side.vercel.app`)
      .then((response) => {
        setDbUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const search = form.search.value;

    axios
      .get(`https://hello-world-server-side.vercel.app?name=${search}`)
      .then((response) => {
        setDbUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleMakeAdmin = (id) => {
    console.log(id);

    const roleInfo = {
      role: "admin",
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
          .put(`https://hello-world-server-side.vercel.app/${id}`, roleInfo)
          .then((response) => {
            console.log(response.data);
            if (response.data.modifiedCount > 0) {
              setDbUser(response.data);
              Swal.fire({
                title: "Updated!",
                text: "Your file has been Updated.",
                icon: "success",
              });
            }
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
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center m-8">Manage users</h1>
      </div>

      <div className="w-full flex justify-center my-10">
        <div className="w-1/2  ">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search Here..."
                name="search"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6 w-full lg:flex items-center">
              <button type="submit" className="btn btn-primary lg:w-1/4 ">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Make Admin</th>
              <th>Subscription Status</th>
            </tr>
          </thead>
          <tbody>
            {dbUser
              ?.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((user) => (
                <DisplayManageUsers
                  key={user._id}
                  user={user}
                  handleMakeAdmin={handleMakeAdmin}
                ></DisplayManageUsers>
              ))}
          </tbody>
        </table>
        <div className="flex justify-center my-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
            onClick={nextPage}
            disabled={currentPage === Math.ceil(dbUser.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
