import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="dashboard d-flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Layout;
