import { Link, NavLink } from "react-router";
import useAuth from "./../hooks/useAuth";
import UserDropdown from "../components/Home/UserDropdown";
import logo from "../assets/innovix_logo.gif"

const Navbar = () => {
  const { user } = useAuth();

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#f511c3] font-bold border-b-2 border-[#00FFFF] bg-transparent rounded-none hover:bg-transparent"
              : "text-[#00FFFF] font-bold hover:text-[#f511c3] hover:bg-transparent"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-[#f511c3] font-bold border-b-2 border-[#00FFFF] bg-transparent rounded-none hover:bg-transparent"
              : "text-[#00FFFF] font-bold hover:text-[#f511c3] hover:bg-transparent"
          }
        >
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-[#f511c3] font-bold border-b-2 border-[#00FFFF] bg-transparent rounded-none hover:bg-transparent"
              : "text-[#00FFFF] font-bold hover:text-[#f511c3] hover:bg-transparent"
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-[#f511c3] font-bold border-b-2 border-[#00FFFF] bg-transparent rounded-none hover:bg-transparent"
              : "text-[#00FFFF] font-bold hover:text-[#f511c3] hover:bg-transparent"
          }
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-[#1E1E2F]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        {/* <a className="btn btn-ghost text-2xl">Innovix </a> */}
        <img className="w-32" src={logo} alt="Logo" />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      {user ? (
        <div className="navbar-end">
          <UserDropdown></UserDropdown>
        </div>
      ) : (
        <div className="navbar-end">
          <div className="flex gap-2 items-center">
            <Link to="/login">
              <button className=" btn-sm px-3 py-0 bg-black text-white">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn-sm px-3 py-0 bg-black text-white">
                Register
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
