import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Chexkout = () => {
  const [formData, setFormData] = useState({
    phone: "",
    location: "",
    zip: "",
    city: "",
    provience: "",
  });
  const navigate = useNavigate()
  const [popup, setPopup] = useState(false);
  const [errors, setErrors] = useState([]);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userparsing = user ? JSON.parse(user) : null;
  const userid = userparsing?._id;

  const [cart, setCart] = useState([]);
 

  const fetchCart = async () => {
    if (!userid) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/cart/${userid}`
      );
      setCart(res.data.cart || []);
      console.log(cart)
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  useEffect(() => {
    
  fetchCart()
    
  }, [])
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let newErrors = [];
   
   

    if (formData.phone.length < 10) {
      newErrors.push("Phone number must be at least 10 digits.");
    }
    if (formData.location.length <= 4) {
      newErrors.push("Street Address must be more than 4 characters.");
    }
    if (formData.zip.length <= 3) {
      newErrors.push("Zip Code must be more than 4 characters.");
    }
    if (formData.city.length <= 4) {
      newErrors.push("City must be more than 4 characters.");
    }
    if (formData.provience.length <= 4) {
      newErrors.push("Province must be more than 4 characters.");
    }
     if(cart.length<=0){
     newErrors.push("The Cart is empty you cant Oder")
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // stop if validation fails
    }

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
        },
      setTimeout(() => {
        navigate('/shop')
      }, 1000)
      );
        setErrors([]);
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
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
            Checkout
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 border-b shadow-sm focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Street Address"
              value={formData.location}
              onChange={handleChange}
              className="p-3 border-b shadow-sm focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={formData.zip}
              onChange={handleChange}
              className="p-3 border-b shadow-sm focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="p-3 border-b shadow-sm focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="text"
              name="provience"
              placeholder="Province"
              value={formData.provience}
              onChange={handleChange}
              className="p-3 border-b shadow-sm focus:ring-2 focus:ring-black"
              required
            />

            <button
              type="submit"
              className="bg-black text-white py-3 rounded-xl shadow-md hover:bg-gray-800 transition"
            >
              Place Order
            </button>
          </form>

          {errors.length > 0 && (
            <div className="mt-4 bg-red-600 text-white p-3 rounded-lg">
              <ul className="list-disc pl-5">
                {errors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {popup && (
          <div className="fixed top-12 right-5 bg-black text-white px-6 py-4 rounded-xl shadow-xl animate-bounce">
            ✅ Order is added to queue. We will contact you soon!
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Chexkout;
