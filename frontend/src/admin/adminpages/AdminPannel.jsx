import React, { useState, useEffect } from "react";
import AdminTools from "../admincomponents/AdminTools";
import AdminData from "../admincomponents/AdminData";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminPannel = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 576);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 576);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex relative w-full h-screen bg-gray-100">
      {/* Sidebar Toggle Button (only on mobile) */}
      {!isLargeScreen && (
        <button
          className="absolute top-5 left-5 z-30 bg-black text-white px-4 py-2 rounded-md shadow-md text-sm font-medium hover:bg-gray-800 transition"
          onClick={() => setOpenSidebar(true)}
        >
         <FaBars />
        </button>
      )}

      {/* Sidebar (Mobile Drawer + Desktop Sidebar) */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 z-20
        ${openSidebar ? "translate-x-0 w-3/4" : "-translate-x-full w-3/4"} 
        md:static md:translate-x-0 md:w-1/4`}
      >
        {/* Close Button (only for mobile) */}
        {!isLargeScreen && (
          <button
            className="absolute top-5 right-5 bg-black text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-800 transition"
            onClick={() => setOpenSidebar(false)}
          >
            ✕
          </button>
        )}
        <AdminTools />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 h-full bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 
        ${isLargeScreen ? "ml-4" : "ml-0"}`}
      >
        <AdminData />
      </div>
    </div>
  );
};

export default AdminPannel;
