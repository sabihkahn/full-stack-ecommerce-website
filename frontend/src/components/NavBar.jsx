import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiMenu, FiShoppingCart, FiX } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userparsing = user ? JSON.parse(user) : null;
  const userid = userparsing?._id;

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useGSAP(() => {
    if (open) {
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(menuRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
    }
  }, [open]);

  // Fetch cart items
  const fetchCart = async () => {
    if (!userid) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/${userid}`);
      // Filter out deleted products
      const validCartItems = res.data.cart.filter(item => item.product && item.product._id);
      setCart(validCartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userid]);

  // Delete item from cart
  const deleteFromCart = async (productID) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/${userid}/${productID}`);
      setCart(cart.filter(item => item.product && item.product._id !== productID));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * (item.product?.price || 0), 0);

  return (
    <div className="w-full sticky top-0 left-0 z-50 bg-[#010a08] text-white font-medium shadow-md">
      {/* Navbar Container */}
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-wide">E commerce</h1>
        </div>
        <div className="flex gap-3 items-center">
          <button className="text-3xl md:text-3xl" onClick={() => setOpen(true)}>
            <FiMenu />
          </button>
          <button className="relative text-2xl text-white" onClick={() => setCartOpen(true)}>
            <FiShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Cart Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white text-black shadow-2xl transform ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={() => setCartOpen(false)} className="text-gray-600 hover:text-black">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[70%]">
          {cart.length > 0 ? (
            cart.map(item => (
              <div key={item._id} className="flex items-center justify-between border p-3 rounded-lg shadow-sm">
                <img
                  src={item.product?.img || "/placeholder.png"}
                  alt={item.product?.name || "Deleted Product"}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 px-3">
                  <h3 className="font-semibold">{item.product?.name || "Deleted Product"}</h3>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × ${item.product?.price || 0}
                  </p>
                </div>
                <button
                  onClick={() => deleteFromCart(item.product?._id)}
                  className="text-red-500 hover:text-red-700"
                  disabled={!item.product?._id}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
          <button
            onClick={() => cart.length > 0 ? navigate("/checkout") : null}
            className={`w-full mt-4 py-2 rounded-lg ${cart.length > 0 ? "bg-black text-white hover:bg-gray-800" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
          >
            Checkout
          </button>
        </div>
      </div>

      {cartOpen && (
        <div onClick={() => setCartOpen(false)} className="fixed inset-0 bg-gray bg-opacity-40 z-40"></div>
      )}

      {/* Slide Menu */}
      <div ref={menuRef} className="fixed top-0 right-0 w-64 md:w-80 h-full bg-white text-black shadow-xl p-6 translate-x-full">
        <button className="text-3xl absolute top-4 right-4" onClick={() => setOpen(false)}>
          <FiX />
        </button>

        <ul className="flex flex-col gap-6 text-lg font-medium mt-6">
          <Link to="/"><li className="cursor-pointer hover:text-green-600" onClick={() => setOpen(false)}>Home</li></Link>
          <Link to="/aboutus"><li className="cursor-pointer hover:text-green-600" onClick={() => setOpen(false)}>About us</li></Link>
          <Link to="/contact"><li className="cursor-pointer hover:text-green-600" onClick={() => setOpen(false)}>Contact</li></Link>

          {token ? (
            <div className="flex flex-col gap-4 pt-4 border-t border-gray-300">
              <li
                className="cursor-pointer flex justify-center items-center text-xl bg-white text-black border-2 border-black p-3 rounded-xl"
                onClick={() => { localStorage.removeItem("token"); localStorage.clear(); setToken(null); }}
              >
                Logout
              </li>
              <Link to="/profile"><li className="cursor-pointer flex justify-center items-center text-xl bg-black text-white p-3 rounded-xl">Profile</li></Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pt-4 border-t border-gray-300">
              <Link to="/login"><li className="cursor-pointer flex justify-center items-center text-xl bg-white text-black border-2 border-black p-3 rounded-xl" onClick={() => setOpen(false)}>Login</li></Link>
              <Link to="/register"><li className="cursor-pointer flex justify-center items-center text-xl bg-black text-white p-3 rounded-xl" onClick={() => setOpen(false)}>Register</li></Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
