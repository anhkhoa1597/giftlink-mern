import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const LayoutWithNav = () => {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default LayoutWithNav;
