import React, { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "./BarChart";

const AdminData = () => {
  const [TotalEarning, setTotalEarning] = useState("");
  const [TotalProducts1, setTotalProducts1] = useState("");
  const [TotalCat, setTotalCat] = useState("");
  const [TotalOders, setTotalOders] = useState("");
  const [Prompt, setPrompt] = useState("");
  const [Aires, setAires] = useState("");
  const [isgetdata, setisgetdata] = useState(false);
  const [prices, setprices] = useState([]);

  const totalEarning = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/getallprices`);
      setTotalEarning(res.data.sales);
      setprices(res.data.pricesoder);
    } catch (error) {
      console.log(error);
    }
  };

  const totalOders = async () => {
    try {
      const res0 = await axios.get(`${import.meta.env.VITE_BASE_URL}/totaloders`);
      setTotalOders(res0.data.totaloders);
    } catch (error) {
      console.log(error);
    }
  };

  const Totalproducts = async () => {
    try {
      const res1 = await axios.get(`${import.meta.env.VITE_BASE_URL}/totalProductOnline`);
      setTotalProducts1(res1.data.totalproducts);
    } catch (error) {
      console.log(error);
    }
  };

  const TotalCatogries = async () => {
    try {
      const res2 = await axios.get(`${import.meta.env.VITE_BASE_URL}/totalcatogries`);
      setTotalCat(res2.data.totalcatogries);
    } catch (error) {
      console.log(error);
    }
  };

  const getdata = async () => {
    setisgetdata(true);
    try {
      const aires = await axios.post(`${import.meta.env.VITE_BASE_URL}/sendaidata`, {
        prompt: Prompt,
      });
      setAires(aires.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setisgetdata(false);
    }
  };

  useEffect(() => {
    totalEarning();
    Totalproducts();
    TotalCatogries();
    totalOders();
  }, []);

  return (
    <div className="w-full  h-full p-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-y-scroll">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 shadow-lg rounded-2xl bg-white hover:shadow-2xl transition">
          <h2 className="text-lg font-semibold text-red-600">Total Earnings</h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">{TotalEarning} Rs</p>
        </div>
        <div className="p-6 shadow-lg rounded-2xl bg-white hover:shadow-2xl transition">
          <h2 className="text-lg font-semibold text-yellow-500">Total Categories</h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">{TotalCat}</p>
        </div>
        <div className="p-6 shadow-lg rounded-2xl bg-white hover:shadow-2xl transition">
          <h2 className="text-lg font-semibold text-blue-500">Total Products</h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">{TotalProducts1}</p>
        </div>
        <div className="p-6 shadow-lg rounded-2xl bg-white hover:shadow-2xl transition">
          <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">{TotalOders}</p>
        </div>
      </div>

      {/* AI Ask Section */}
      <div className="p-6 shadow-lg rounded-2xl bg-white mb-6">
        <label className="block mb-3 text-sm font-medium text-gray-700">
          Ask AI for Top Products
        </label>
        <div className="flex flex-col gap-3">
          <input
            value={Prompt}
            type="text"
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={getdata}
            disabled={isgetdata}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              isgetdata
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isgetdata ? "Sending..." : "Send"}
          </button>
        </div>
      </div>

      {/* AI Response */}
      <div className="p-6 shadow-lg rounded-2xl bg-white h-52 overflow-y-auto mb-10">
        {Aires ? (
          <p className="text-gray-700 whitespace-pre-wrap">{Aires}</p>
        ) : (
          <p className="text-gray-400">AI responses will appear here...</p>
        )}
      </div>
 
 
      {/* Chart Section */}
      <div className="w-full h-[400px] overflow-x-auto overflow-y-hidden whitespace-nowrap p-4 shadow-inner bg-white rounded-2xl">
        <BarChart prices={prices} />
      </div>
    </div>
  );
};

export default AdminData;
