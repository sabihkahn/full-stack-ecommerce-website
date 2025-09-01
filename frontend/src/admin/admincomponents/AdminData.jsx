import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

const AdminData = () => {

  const [TotalEarning, setTotalEarning] = useState('')
  const [TotalProducts1, setTotalProducts1] = useState('')
  const [TotalCat, setTotalCat] = useState('')
  const [TotalOders, setTotalOders] = useState('')

  const totalEarning = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/totalearning`)
      console.log(res);
      setTotalEarning(res.data.totalprice)

    } catch (error) {
      console.log(error);

    }
  }
  const totalOders = async () => {
    try {
      const res0 = await axios.get(`${import.meta.env.VITE_BASE_URL}/totaloders`)
      console.log('helo',res0);
      setTotalOders(res0.data.totaloders)

    } catch (error) {
      console.log(error);

    }
  }

  const Totalproducts = async () => {
    try {
      const res1 = await axios.get(`${import.meta.env.VITE_BASE_URL}/totalProductOnline`)
      console.log(res1);
      setTotalProducts1(res1.data.totalproducts)

    } catch (error) {
      console.log(error);

    }
  }
  const TotalCatogries = async () => {
    try {
      const res2 = await axios.get(`${import.meta.env.VITE_BASE_URL}/totalcatogries`)
      console.log('THIS IS CATO', res2);
      setTotalCat(res2.data.totalcatogries)

    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    totalEarning()
    Totalproducts()
    TotalCatogries()
    totalOders()

  }, [TotalEarning, TotalProducts1])





  return (
    <div className="w-full h-full p-6 bg-white overflow-y-auto">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 shadow rounded-xl bg-gray-50 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Earnings</h2>
          <p className="text-2xl font-bold text-gray-900">{TotalEarning} Rs</p>
        </div>
        <div className="p-6 shadow rounded-xl bg-gray-50 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Categories</h2>
          <p className="text-2xl font-bold text-gray-900">{TotalCat}</p>
        </div>
        <div className="p-6 shadow rounded-xl bg-gray-50 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
          <p className="text-2xl font-bold text-gray-900">{TotalProducts1}</p>
        </div>
        <div className="p-6 shadow rounded-xl bg-gray-50 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
          <p className="text-2xl font-bold text-gray-900">{TotalOders}</p>
        </div>
      </div>

      {/* AI Ask Section */}
      <div className="p-6 shadow rounded-xl bg-gray-50">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Ask AI for Top Products
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask AI"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            Send
          </button>
        </div>
      </div>

      {/* Message Receiving Container */}
      <div className="mt-6 p-6 shadow rounded-xl bg-gray-50 h-48 overflow-y-auto">
        <p className="text-gray-500">AI responses will appear here...</p>
      </div>
    </div>
  );
};

export default AdminData;
