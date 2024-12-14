import { Outlet } from "react-router";
import SideBar from "../components/Dashboard/SideBar";

const DashboardLayout = () => {
  return (
    <div className="md:grid grid-cols-12">
      <div className="col-span-2">
        <SideBar></SideBar>
      </div>
      <div className="col-span-10 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
