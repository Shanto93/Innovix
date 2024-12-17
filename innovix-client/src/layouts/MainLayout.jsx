import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <div className="md:px-28 mx-auto bg-[#1E1E2F]">
        <Navbar></Navbar>
      </div>
      <div className="min-h-screen md:px-28 mx-auto bg-[#1E1E2F]">
        <Outlet></Outlet>
      </div>
      <div className="md:px-28 mx-auto bg-[#1E1E2F]">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;
