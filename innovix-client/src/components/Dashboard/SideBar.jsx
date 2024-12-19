import { Link, NavLink } from "react-router";
import { useNavigate } from "react-router";
import { GrOverview } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import useUserData from "./../../hooks/useUserData";
import { MdOutlineInventory2 } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import logo from "../../assets/innovix_logo.gif";
import { BsCart3 } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import useAuth from "./../../hooks/useAuth";

const SideBar = () => {
  const { userData } = useUserData();
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const sellerRoutes = [
    {
      id: 1,
      path: "/dashboard/my-products",
      title: "My Products",
      icon: <MdOutlineInventory2 />,
    },
    {
      id: 2,
      path: "/dashboard/add-product",
      title: "Add Products",
      icon: <IoIosAddCircleOutline />,
    },
  ];
  const buyerRoutes = [
    {
      id: 1,
      path: "/dashboard/wishlist",
      title: "My Wishlist",
      icon: <BsCart3 />,
    },
  ];
  const adminRoutes = [
    {
      id: 1,
      path: "/dashboard/manageUsers",
      title: "Manage Users",
      icon: <CiEdit />,
    },
  ];

  return (
    <div className=" min-h-screen flex justify-center mr-2 border-r-2 h-fullF">
      <ul className="uppercase">
        <Link to="/">
          <img className="w-32 mt-8" src={logo} alt="Logo" />
        </Link>
        <NavLink to="/dashboard/overview">
          <li className="px-3 py-2 mt-2 border rounded-md flex gap-2 w-full items-center border-white text-[#E0E0E0] hover:bg-[#00FFFF] hover:scale-105 hover:shadow-md hover:shadow-[#00FFFF] hover:text-white hover:border-none">
            <GrOverview />
            <p>Overview</p>
          </li>
        </NavLink>

        {userData?.role === "admin" &&
          adminRoutes.map((route) => (
            <NavLink key={route.id} to={route.path}>
              <li className="px-3 py-2 mt-2 border rounded-md flex gap-2 w-full items-center border-white text-[#E0E0E0] hover:bg-[#00FFFF] hover:scale-105 hover:shadow-md hover:shadow-[#00FFFF] hover:text-white hover:border-none">
                {route.icon}
                <p>{route.title}</p>
              </li>
            </NavLink>
          ))}
        {userData?.role === "seller" &&
          sellerRoutes.map((route) => (
            <NavLink key={route.id} to={route.path}>
              <li className="px-3 py-2 mt-2 border rounded-md flex gap-2 w-full items-center border-white text-[#E0E0E0] hover:bg-[#00FFFF] hover:scale-105 hover:shadow-md hover:shadow-[#00FFFF] hover:text-white hover:border-none">
                {route.icon}
                <p>{route.title}</p>
              </li>
            </NavLink>
          ))}

        {userData?.role === "buyer" &&
          buyerRoutes.map((route) => (
            <NavLink key={route.id} to={route.path}>
              <li className="px-3 py-2 mt-2 border rounded-md flex gap-2 w-full items-center border-white text-[#E0E0E0] hover:bg-[#00FFFF] hover:scale-105 hover:shadow-md hover:shadow-[#00FFFF] hover:text-white hover:border-none">
                {route.icon}
                <p>{route.title}</p>
              </li>
            </NavLink>
          ))}

        <div className="divider"></div>
        <NavLink to="/">
          <li className="px-3 py-2 mt-2 border rounded-md flex gap-2 w-full items-center border-white text-[#E0E0E0] hover:bg-[#00FFFF] hover:scale-105 hover:shadow-md hover:shadow-[#00FFFF] hover:text-white hover:border-none">
            <IoHomeOutline />
            <p>Home</p>
          </li>
        </NavLink>
        <li>
          <button
            onClick={handleLogout}
            className="bg-[#fc0505] hover:shadow-red-500 hover:shadow-md btn btn-sm mt-2 w-full border-none uppercase text-white hover:bg-[#ff3b3b]"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
