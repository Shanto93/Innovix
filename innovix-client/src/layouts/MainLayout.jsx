import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <div className="bg-[#1E1E2F]">
      <div className="md:max-w-screen-lg mx-auto">
        <div className="mx-auto ">
          <Navbar></Navbar>
        </div>
        <div className="min-h-screen mx-auto">
          <Outlet></Outlet>
        </div>
        <div className="">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
