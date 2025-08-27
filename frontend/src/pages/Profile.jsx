import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token") || "";

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/userprofile`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.success) {
        setProfileData(response.data.user);
      } else {
        console.error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-500">
        Failed to load profile
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-2xl">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="w-24 h-24 bg-green-600 text-white flex items-center justify-center text-3xl font-bold rounded-full shadow-3xl">
          {profileData.username[0].toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{profileData.username}</h2>
          <p className="text-gray-500">{profileData.email}</p>
          <p className="text-sm mt-1">
            Role:{" "}
            <span className="font-semibold text-green-600">
              {profileData.role === 1 ? "Admin" : "User"}
            </span>
          </p>
          <p className="text-sm text-gray-400">
            Joined on {new Date(profileData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Cart Section */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Your Cart</h3>
        {profileData.cart.length > 0 ? (
          <ul className="space-y-4">
            {profileData.cart.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center bg-gray-900 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-medium text-white">
                    Product ID: {item.product}
                  </p>
                  <p className="text-sm text-white">Quantity: {item.quantity}</p>
                </div>
                <span className="px-3 py-1 text-sm bg-white text-black rounded-full">
                  In Cart
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your cart is empty</p>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Profile;
