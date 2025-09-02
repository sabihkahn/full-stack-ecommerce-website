import React, { useEffect } from 'react'
import {  FaHome,FaPlus, FaBoxOpen, FaClipboardList, FaTags, FaListAlt } from "react-icons/fa";

const AdminTools = ({ setdatashow }) => {



 
  return (
    <div className="justify-start py-15 items-start flex flex-col w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">⚙️ Admin Tools</h2>

      <div className="flex flex-col mt-6 gap-4 w-full">
        <button
          onClick={() => setdatashow("HOME")}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-black hover:bg-gray-300 transition-all duration-300 shadow-md"
        >
          <FaHome /> HOME
        </button>
        <button
          onClick={() => setdatashow("Products")}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-black hover:bg-gray-300 transition-all duration-300 shadow-md"
        >
          <FaPlus /> Create Products
        </button>

        <button
          onClick={() => setdatashow("View Products")}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-black hover:bg-gray-300 transition-all duration-300 shadow-md"
        >
          <FaBoxOpen /> Manage products
        </button>

        <button
          onClick={() => setdatashow("Orders")}
          className="flex items-center gap-3 px-5 py-3 rounded-xl text-black hover:bg-gray-300 transition-all duration-300 shadow-md"
        >
          <FaClipboardList /> Pending oders
        </button>

        <button
          onClick={() => setdatashow("Categories")}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-black hover:bg-gray-300 transition-all duration-300 shadow-md"
        >
          <FaTags /> Manage Catogries
        </button>

        <button
          onClick={() => setdatashow("All Orders")}
          className="flex items-center gap-3 px-3 py-3 rounded-xl  text-black hover:bg-gray-300 transition-all duration-300 shadow-md"
        >
          <FaListAlt /> all oders
        </button>
      </div>
    </div>
  )
}

export default AdminTools
