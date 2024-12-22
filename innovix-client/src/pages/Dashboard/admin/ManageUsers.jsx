import { Link } from "react-router";
import useAllUsers from "../../../hooks/useAllUsers";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const { allUsers, refetch } = useAllUsers();
  const axiosPublic = useAxiosPublic();
  // console.log(allUsers.length);

  const token = localStorage.getItem("access-token");

  const handleAcceptRequest = (uId) => {
    axiosPublic.patch(`/users/makeseller/${uId}`).then((res) => {
      refetch();
      console.log(res);
    });
  };
  const handleRejectRequest = (uId) => {
    axiosPublic.patch(`/users/makebuyer/${uId}`).then((res) => {
      refetch();
      console.log(res);
    });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/users/${id}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            // console.log(res.data.deletedCount);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Innovix | Manage Users</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="text-white">#</th>
              <th className="text-white">Photo</th>
              <th className="text-white">Name</th>
              <th className="text-white">Role</th>
              <th className="text-white text-center">Status</th>
              <th className="text-white">Delete</th>
              <th className="text-white">Edit</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-white">
                  No Users
                </td>
              </tr>
            ) : (
              allUsers.map((user, index) => (
                <tr key={index}>
                  <th className="text-white">{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              user.photoURL || "https://via.placeholder.com/150"
                            }
                            alt={`${user.name || "User"}'s Avatar`}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-white">{user.name || "Unknown"}</td>
                  <td className="text-white">{user.role || "User"}</td>
                  <td className="text-white">
                    {user.status === "pending" ? (
                      <div className="flex justify-center  items-center gap-3">
                        <button
                          onClick={() => handleAcceptRequest(user._id)}
                          className="btn-sm py-0 bg-green-500 border-none shadow-2xl"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(user._id)}
                          className="btn-sm py-0 bg-red-600 border-none shadow-2xl"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <button
                          className={`${
                            user.status === "approved"
                              ? "btn-sm py-0 bg-green-600 border-none shadow-2xl shadow-green-600/50"
                              : "btn-sm py-0 bg-red-600 border-none shadow-2xl"
                          }`}
                        >
                          {user.status}
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="text-white">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn-sm py-0 bg-red-600 border-none  shadow-2xl"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="text-white">
                    <Link to={`/dashboard/edituserinfo/${user.email}`}>
                      {user.role === "admin" ? (
                        <button
                          disabled
                          className="btn-sm py-0 bg-[#FFD700] border-none shadow-2xl"
                        >
                          Edit
                        </button>
                      ) : (
                        <button className="btn-sm py-0 bg-[#FFD700] border-none shadow-2xl">
                          Edit
                        </button>
                      )}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
