import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { FaTimes, FaFilter } from "react-icons/fa";

const FilterProducts = ({ setProducts }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const panelRef = useRef(null);
    const [Category12, setCategory12] = useState("");
    // Animate filter panel
    useEffect(() => {
        if (showFilter) {
            gsap.fromTo(
                panelRef.current,
                { x: "100%" },
                { x: "0%", duration: 0.5, ease: "power3.out" }
            );
        } else {
            gsap.to(panelRef.current, {
                x: "100%",
                duration: 0.5,
                ease: "power3.in",
            });
        }
    }, [showFilter]);

    const applyFilter = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/filter`,
                {
                    params: {
                        category: selectedCategory,
                        minPrice,
                        maxPrice,
                    },
                }
            );
            setProducts(data);
            setShowFilter(false);
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        }
    };

    const getCategoryId = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/getCatogery`);
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    }
   


    useEffect(() => {
        getCategoryId();
    }, []);

    return (
        <>
          

            <div>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
                    onClick={() => setShowFilter(true)}
                >
                    <FaFilter /> Filter
                </button>

                <div
                    ref={panelRef}
                    className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg p-5 z-50"
                    style={{ transform: "translateX(100%)" }}
                >
                    <button
                        className="absolute top-4 right-4 text-gray-600"
                        onClick={() => setShowFilter(false)}
                    >
                        <FaTimes size={20} />
                    </button>

                    <h2 className="text-lg font-semibold mb-4">Filter Products</h2>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full border px-3 py-2 mb-3 rounded"
                    >
                        <option value="">All Categories</option>
                        {categories.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full border px-3 py-2 mb-3 rounded"
                    />

                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full border px-3 py-2 mb-3 rounded"
                    />

                    <button
                        className="w-full py-2 bg-black text-white rounded-lg mt-3"
                        onClick={applyFilter}
                    >
                        Apply Filter
                    </button>
                </div>
            
            </div>
            <button
                        className="w-full py-2 bg-black text-white rounded-lg mt-3"
                        onClick={()=>{window.location.reload()}}
                    >
                        clear Filter
                    </button>
        </>
    );
};

export default FilterProducts;