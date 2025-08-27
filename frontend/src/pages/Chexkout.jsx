import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const Chexkout = () => {
  const [formData, setFormData] = useState({
   
    phone: "",
    location: "",
    zip: "",
    city: "",
    provience: "",
  });

  const [popup, setPopup] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create-oder`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (res.data.message === "Order placed successfully") {
        setPopup(true);
        setFormData({
          totalPrice: "",
          phone: "",
          location: "",
          zip: "",
          city: "",
          provience: "",
        });

        setTimeout(() => setPopup(false), 3000);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex mt-8 justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
         
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Street Address"
            value={formData.location}
            onChange={handleChange}
            className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={formData.zip}
            onChange={handleChange}
            className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="text"
            name="provience"
            placeholder="Province"
            value={formData.provience}
            onChange={handleChange}
            className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-black"
            required
          />

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-xl shadow-md hover:bg-gray-800 transition"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* ✅ Success Popup */}
      {popup && (
        <div className="fixed top-5 right-5 bg-black text-white px-6 py-4 rounded-xl shadow-xl animate-bounce">
          ✅ Order is added to queue. we will contact you soon!
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default Chexkout;
