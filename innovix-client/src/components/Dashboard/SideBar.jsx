import { Link, NavLink } from "react-router";
import { GrOverview } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";

const SideBar = () => {
  return (
    <div className=" min-h-screen flex justify-center mr-2 border-r-2">
      <ul className="uppercase">
        <Link to="/">
          <h1 className="text-xl font-serif font-semibold mt-8 btn bg-transparent border-none hover:bg-transparent hover:border-none">
            INNOVIX
          </h1>
        </Link>
        <NavLink to="/dashboard/">
          <li className="px-3 py-2 mt-2 border rounded-md flex gap-2 w-full items-center border-black hover:bg-[#3c23ba] hover:text-white hover:border-none">
            <GrOverview />
            <p>Overview</p>
          </li>
        </NavLink>

        <div className="divider"></div>
        <NavLink to="/">
          <li className="px-3 py-2 mt-2 border rounded-md flex gap-2 w-full items-center border-black hover:bg-[#3c23ba] hover:text-white hover:border-none">
            <IoHomeOutline />

            <p>Home</p>
          </li>
        </NavLink>
        <li>
          <button className="bg-[#fc0505] btn btn-sm mt-2 w-full border-none uppercase text-white hover:bg-[#ff3b3b]">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
