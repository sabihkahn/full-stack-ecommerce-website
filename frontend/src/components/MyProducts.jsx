import React from 'react';
import redshoes from '../assets/red.jpg';
import greenshoes from '../assets/green.jpg';
import yellowshoes from '../assets/yello.jpg';

const MyProducts = () => {
  const images = [
    "https://sageleather.com.pk/wp-content/uploads/2024/10/IMG_3702.jpg",
    "https://www.calza.com.pk/cdn/shop/products/1_ea2f51e9-425c-4382-a1b8-6792a5d22eec.jpg?v=1755867265",
    "https://onedegree.com.pk/cdn/shop/files/39_6fb6be73-ff30-4df7-868e-00bb9b0d7771.jpg?v=1706092698&width=1206",
  ];

  return (
    <div className="w-full px-4 md:px-12 lg:px-20 py-12 bg-gray-50">
      {/* Main Featured Product */}
      <div className="max-w-6xl mx-auto h-auto md:h-[70vh] bg-white text-black flex flex-col md:flex-row items-center justify-between p-8 gap-8 shadow-xl rounded-2xl overflow-hidden hover:shadow-4xl transition-shadow duration-500">
        {/* Text Content */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center gap-5 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Yellow Shoes
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md">
            Comfortable and stylish yellow shoes perfect for any occasion.
            Lightweight, durable, and designed to fit perfectly.
          </p>
          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            Shop Now
          </button>
        </div>

        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={redshoes}
            alt="Yellow Shoes"
            className="h-72 md:h-80 lg:h-96 w-auto rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Other Products */}
      <div className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            className="bg-white flex flex-col items-center justify-center rounded-xl border border-gray-500 shadow-md hover:shadow-xl transition-shadow duration-300 p-6 group"
          >
            <div className="w-full flex justify-center items-center overflow-hidden rounded-lg">
              <img
                src={src}
                alt={`Product ${index + 1}`}
                className="w-56 h-56 object-cover rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h4 className="mt-5 w-full  text-black font-semibold py-2 rounded-full transition text-center">
             Jorden boots 
            </h4>
          </div>
        ))}


      </div>

       <div className="max-w-6xl mx-auto h-auto md:h-[70vh] bg-white text-black flex flex-col md:flex-row items-center justify-between p-8 gap-8 shadow-xl rounded-2xl overflow-hidden hover:shadow-4xl transition-shadow duration-500">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={greenshoes}
            alt="Yellow Shoes"
            className="h-72 md:h-80 lg:h-96 w-auto rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        {/* Text Content */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center gap-5 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
           Green Shoes
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md">
            Comfortable and stylish yellow shoes perfect for any occasion.
            Lightweight, durable, and designed to fit perfectly.
          </p>
          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            Shop Now
          </button>
        </div>

        {/* Product Image */}
      </div>

    </div>
  );
};

export default MyProducts;
