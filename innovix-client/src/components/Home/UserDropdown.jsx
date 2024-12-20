import { NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useUserData from "../../hooks/useUserData";

const UserDropdown = () => {
  const { logoutUser, user } = useAuth();
  const navigate = useNavigate();
  const { userData } = useUserData();
  const totalWishlist = userData?.wishlist?.length;
  // console.log(totalWishlist);
  // console.log(userData.role);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 bg-transparent border-none hover:bg-transparent"
      >
        <div className="flex">
          {userData?.role === "seller" ?
          <div className="badge badge-secondary badge-outline">Seller </div>:
          <div className="badge badge-secondary">+{totalWishlist} </div>
          }
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
              <img src={user.photoURL} />
            </div>
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow flex gap-2"
      >
        <li>
          <NavLink to="/dashboard/overview">Dashboard</NavLink>
        </li>
        <li>
          <button
            className="bg-[#fc0505] shadow-2xl  text-white hover:bg-[#ff3b3b]"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
