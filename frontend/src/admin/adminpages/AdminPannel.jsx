import React, { useState, useEffect } from "react";
import AdminTools from "../admincomponents/AdminTools";
import AdminData from "../admincomponents/AdminData";
import { FaBars } from "react-icons/fa";

import ManageProducts from "../admincomponents/ManageProducts";
import CreateProducts from "../admincomponents/CreateProducts";
import ManageCatogries from "../admincomponents/ManageCatogries";
import Oders from "../admincomponents/Oders";
import PendingOders from "../admincomponents/PendingOders";
import AllOders from "../admincomponents/Alloders";

const AdminPannel = () => {
  const [datashow, setdatashow] = useState("adminData");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 576);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 576);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderComponent = () => {
    switch (datashow) {
      case "Products":
        return <CreateProducts />;
      case "HOME":
        return <AdminData />;
      case "View Products":
        return <ManageProducts />;
      case "Orders":
        return <Oders />;
      case "Pending Orders":
        return <PendingOders />;
      case "Categories":
        return <ManageCatogries />;
      case "All Orders":
        return <AllOders />;
      default:
        return <AdminData />;
    }
  };

  return (
    <div className="flex relative w-full h-screen bg-gray-100">
      {/* Sidebar Toggle Button (mobile only) */}
      {!isLargeScreen && (
        <button
          className="absolute top-5 left-5 z-30 bg-black text-white px-4 py-2 rounded-md shadow-md text-sm font-medium hover:bg-gray-800 transition"
          onClick={() => setOpenSidebar(true)}
        >
          <FaBars />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 z-20
        ${openSidebar ? "translate-x-0 w-3/4" : "-translate-x-full w-3/4"} 
        md:static md:translate-x-0 md:w-1/4`}
      >
        {!isLargeScreen && (
          <button
            className="absolute top-5 right-5 bg-black text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-800 transition"
            onClick={() => setOpenSidebar(false)}
          >
            ✕
          </button>
        )}
        <AdminTools setdatashow={setdatashow} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 h-full bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 
        ${isLargeScreen ? "ml-4" : "ml-0"}`}
      >
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminPannel;
