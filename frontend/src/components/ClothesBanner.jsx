import React from 'react'
import ecom1 from '../assets/BusyHand.jpg'
import { useNavigate } from 'react-router-dom'
const ClothesBanner = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-[70vh] relative overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <img
                src={ecom1}
                alt="E-commerce Banner"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay (optional dark gradient for readability) */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Centered Content */}
            <div className="relative z-10 text-center px-4">
                <h3 className="text-3xl md:text-5xl text-white font-semibold leading-snug">
                    Welcome to our e-commerce store
                </h3>
                <button onClick={()=>{navigate("/shop")}} className="mt-6 py-3 px-8 bg-amber-300 text-lg md:text-xl text-black font-bold rounded-lg shadow-lg hover:bg-amber-400 transition">
                    Shop Now
                </button>
            </div>
        </div>
    )
}

export default ClothesBanner
