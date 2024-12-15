import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <div className="max-w-screen-lg mx-auto">
        <Navbar></Navbar>
      </div>
      <div className="min-h-screen max-w-screen-lg mx-auto">
        <Outlet></Outlet>
      </div>
      <div className="max-w-screen-lg mx-auto">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;
