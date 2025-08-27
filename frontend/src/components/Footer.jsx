import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setShowPopup(true);

    try {
      const response = await fetch("https://emaisender.vercel.app/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Email sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send email.");
      }
    } catch (error) {
      setStatus("Error sending email.");
      console.error(error);
    }

    // Hide popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <footer className="bg-black text-gray-300 py-12 px-6 md:px-16 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand + Newsletter */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">MyStore</h2>
          <p className="mb-4 text-sm text-gray-400">
            Contact us or subscribe for exclusive deals and updates.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 bg-gray-800 rounded-xl overflow-hidden p-4 shadow-lg"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 text-white outline-none rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 text-white outline-none rounded-lg"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="px-4 py-2 bg-gray-700 text-white outline-none rounded-lg resize-none"
              required
            />
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-400 text-black font-semibold rounded-full hover:bg-amber-500 transition">
              <FiSend /> Send
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm flex flex-col">
            <Link to="/" className="hover:text-amber-400 cursor-pointer">Home</Link>
            <Link to="/shop" className="hover:text-amber-400 cursor-pointer">Shop</Link>
            <Link to="/aboutus" className="hover:text-amber-400 cursor-pointer">About Us</Link>
            <Link to="/contact" className="hover:text-amber-400 cursor-pointer">Contact us</Link>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://github.com/sabihkhan"
              className="p-3 rounded-full bg-gray-800 hover:bg-amber-400 hover:text-black transition"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/sabih-khan-779185309"
              className="p-3 rounded-full bg-gray-800 hover:bg-amber-400 hover:text-black transition"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce z-50">
          {status}
        </div>
      )}
    </footer>
  );
};

export default Footer;
