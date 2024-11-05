import React from "react";
import Nav from "../components/Nav/Nav";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const AppLayout = () => {
  return (
    <>
      <Nav />
      <div className="bg-gray-100">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
