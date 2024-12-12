import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const UserDropdown = () => {
  const { logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 bg-transparent border-none hover:bg-transparent"
      >
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <Link>Dashboard</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
