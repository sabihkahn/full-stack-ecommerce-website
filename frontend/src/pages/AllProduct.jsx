import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import FilterProducts from "../components/FilterProducts";

const AllProduct = () => {
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [finditem, setFinditem] = useState("");
  const [showFilter, setShowFilter] = useState(false); // mobile filter toggle
  const navigate = useNavigate();
  const filterRef = useRef(null);

  // Animate mobile filter drawer
  useEffect(() => {
    if (showFilter) {
      gsap.fromTo(
        filterRef.current,
        { x: "100%" },
        { x: 0, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(filterRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [showFilter]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/get-product/${limit}`
      );
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Search products
  const handleSearch = async () => {
    if (!finditem.trim()) {
      fetchProducts();
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/search?q=${finditem}`
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [limit]);

  const handleNavigate = (item) => {
    navigate(`/product/${item._id}`, { state: item });
  };

  const handleLoadMore = () => {
    if (limit === 10) setLimit(20);
    else if (limit === 20) setLimit(40);
    else if (limit === 40) setLimit(0);
  };

  return (
    <>
      {/* Search bar */}
      <div className="flex items-center gap-2 mt-10 mb-6 bg-white rounded-xl shadow-md px-3 py-2 border border-gray-200">
        <input
          value={finditem}
          onChange={(e) => setFinditem(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-gray-800 to-black text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
        >
          Search
        </button>

        {/* Mobile filter toggle button */}
        <button
          onClick={() => setShowFilter(true)}
          className="sm:hidden bg-gray-900 text-white px-4 py-2 rounded-lg ml-2"
        >
          Filters
        </button>
      </div>

      <div className="flex flex-row gap-4 h-[90vh] w-full p-4 mt-4">
        {/* Sidebar - Desktop only */}
        <div className="hidden sm:block w-[20%] border rounded-xl shadow-lg p-4 bg-white sticky top-20 self-start">
          <FilterProducts setProducts={setProducts} />
        </div>

        {/* Product list */}
        <div className="w-full sm:w-[80%] h-[80vh] overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pr-2">
          {products &&
          products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            products.map((item) => (
              <div
                key={item._id}
                className="bg-white h-[53vh] rounded-2xl shadow-md hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 flex flex-col border border-gray-100"
              >
                <img
                  src={item.img}
                  className="h-52 w-full object-cover rounded-t-2xl"
                  alt={item.name}
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h1 className="font-semibold text-lg text-gray-800">
                    {item.name}
                  </h1>
                  <p className="text-gray-500 text-sm flex-grow mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${item.price}
                    </span>
                    <span className="text-xs text-gray-400">
                      Stock: {item.stock}
                    </span>
                  </div>
                  <button
                    onClick={() => handleNavigate(item)}
                    className="mt-5 bg-gradient-to-r from-gray-900 to-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            )))}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        ref={filterRef}
        className="fixed top-0 right-0 w-3/4 sm:w-[400px] h-full bg-white shadow-xl p-5 z-50 sm:hidden"
        style={{ transform: "translateX(100%)" }}
      >
        <FilterProducts setProducts={setProducts} />
      </div>

      {/* Dark backdrop when filter open */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
          onClick={() => setShowFilter(false)}
        ></div>
      )}

      {/* Load More button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleLoadMore}
          className="px-8 py-2 bg-gradient-to-r from-gray-800 to-black text-white rounded-full shadow-md hover:shadow-lg hover:opacity-90 transition"
        >
          {limit === 10
            ? "Load 20"
            : limit === 20
            ? "Load 40"
            : limit === 40
            ? "Load All"
            : "All Loaded"}
        </button>
      </div>
    </>
  );
};

export default AllProduct;
