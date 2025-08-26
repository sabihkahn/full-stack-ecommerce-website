import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiFilter } from "react-icons/fi";

const FilterProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/getCatogery`);
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch products
  const fetchProducts = async (category = "") => {
    try {
      let url = `${import.meta.env.VITE_BASE_URL}/filter`;
      if (category) url += `?category=${category}`;
      const { data } = await axios.get(url);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Filter by category
  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    fetchProducts(catId);
    setMobileFilterOpen(false);
  };

  // Add to cart
  const addToCart = async (productId) => {
    if (!user._id) return alert("Login to add to cart");
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/add-to-cart/${user._id}`,
        { product: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Product added to cart");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 px-4 md:px-6 py-6 gap-6">
      
      {/* Sidebar for desktop */}
      <div className={`bg-white p-4 rounded-lg shadow-md w-full md:w-1/4 ${mobileFilterOpen ? "block absolute z-50 top-0 left-0 h-full" : "hidden md:block"}`}>
        <h2 className="text-lg font-bold text-black mb-4">Filters</h2>
        <ul className="flex flex-col gap-2">
          {categories.map((cat) => (
            <li key={cat._id}>
              <button
                onClick={() => handleCategoryClick(cat._id)}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium border-2 ${
                  selectedCategory === cat._id ? "bg-black text-white" : "bg-white text-black border-black"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setMobileFilterOpen(false)}
          className="mt-4 md:hidden w-full py-2 bg-black text-white rounded-lg"
        >
          Close
        </button>
      </div>

      {/* Mobile filter button */}
      <button
        onClick={() => setMobileFilterOpen(true)}
        className="md:hidden mb-4 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
      >
        <FiFilter /> Filters
      </button>

      {/* Products */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((prod) => (
            <div key={prod._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
              <img src={prod.img} alt={prod.name} className="h-48 w-full object-cover rounded-md mb-4" />
              <h3 className="text-lg font-bold text-black">{prod.name}</h3>
              <p className="text-gray-600 text-sm">{prod.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-black">${prod.price}</span>
                <button
                  onClick={() => addToCart(prod._id)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-black col-span-full text-center mt-6">No products found</p>
        )}
      </div>
    </div>
  );
};

export default FilterProducts;
