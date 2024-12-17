import { NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useUserData from "../../hooks/useUserData";

const UserDropdown = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const userdata = useUserData();
  const totalWishlist = userdata?.userData?.wishlist?.length;

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
          <div className="badge badge-secondary">+{totalWishlist} </div>
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
            className="bg-[#fc0505] text-white hover:bg-[#ff3b3b]"
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
