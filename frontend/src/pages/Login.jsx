import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
       
       if (data.user.role === 1) {
      navigate("/admin")
    } else {
      navigate("/")      
    }

    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">Login</h2>

        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <FiMail className="text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full outline-none text-black bg-white"
            />
          </div>

          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <FiLock className="text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full outline-none text-black bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded-full transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-black hover:text-gray-700 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;