import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiMenu, FiShoppingCart, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // GSAP animation for menu
  useGSAP(() => {
    if (open) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [open]);

  return (
    <div className="w-full sticky top-0 left-0 z-50 bg-[#010a08] text-white font-medium shadow-md">
      {/* Navbar Container */}
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-wide">E commerce</h1>
        </div>
        <div className="flex gap-1">
          <button
            className="text-3xl md:text-3xl"
            onClick={() => setOpen(true)}
          >
            <FiMenu />
          </button>
          <button className="relative text-2xl text-white">
            <FiShoppingCart />
          
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              0
            </span>
          </button>
        </div>
       

      </div>

    
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-64 md:w-80 h-full bg-white text-black shadow-xl p-6 translate-x-full"
      >
        {/* Close Button */}
        <button
          className="text-3xl absolute top-4 right-4"
          onClick={() => setOpen(false)}
        >
          <FiX />
        </button>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mt-10 mb-6 bg-gray-100 rounded-lg px-3 py-2">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-transparent outline-none text-gray-700"
          />
        </div>

        {/* Menu Links */}
        <ul className="flex flex-col gap-6 text-lg font-medium mt-6">
          <Link to="/">
            <li
              className="cursor-pointer hover:text-green-600"
              onClick={() => setOpen(false)}
            >
              Home
            </li>
          </Link>
          <Link to="/aboutus">
            <li
              className="cursor-pointer hover:text-green-600"
              onClick={() => setOpen(false)}
            >
              About us
            </li>
          </Link>
          <Link to="/contact">
            <li
              className="cursor-pointer hover:text-green-600"
              onClick={() => setOpen(false)}
            >
              Contact
            </li>
          </Link>

          {/* Auth Buttons */}
          <div className="flex flex-col gap-4 pt-4 border-t border-gray-300">
            <Link to="/login">
              <li
                className="cursor-pointer flex justify-center items-center text-xl bg-white text-black border-2 border-black p-3 rounded-xl"
                onClick={() => setOpen(false)}
              >
                Login
              </li>
            </Link>
            <Link to="/register">
              <li
                className="cursor-pointer flex justify-center items-center text-xl bg-black text-white p-3 rounded-xl"
                onClick={() => setOpen(false)}
              >
                Register
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
