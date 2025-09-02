import { useEffect, useState } from "react";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Modal & update state
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [extraImageFiles, setExtraImageFiles] = useState([]);
  const [mainImageURL, setMainImageURL] = useState("");
  const [extraImageURLs, setExtraImageURLs] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/get-product/${limit}`);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to fetch products");
    }
    setLoading(false);
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/getCatogery`);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [limit]);

  const loadMoreProducts = () => setLimit((prev) => prev + 10);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/delete-product/${deleteProductId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setProducts((prev) => prev.filter((p) => p._id !== deleteProductId));
      setShowDeletePopup(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete product");
    }
  };

  const openUpdateModal = (product) => {
    setCurrentProduct(product);
    setMainImageURL(product.img);
    setExtraImageURLs(product.extraimages || []);
    setShowModal(true);
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      data
    );
    return res.data.secure_url;
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      let mainURL = mainImageURL;
      if (mainImageFile) mainURL = await uploadToCloudinary(mainImageFile);

      let extraURLs = extraImageURLs;
      if (extraImageFiles.length > 0) {
        const uploaded = await Promise.all(extraImageFiles.map((f) => uploadToCloudinary(f)));
        extraURLs = [...extraURLs, ...uploaded];
      }

      const updatedProduct = {
        ...currentProduct,
        img: mainURL,
        extraimages: extraURLs,
      };

      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/update-product/${currentProduct._id}`,
        updatedProduct,
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      setProducts((prev) =>
        prev.map((p) => (p._id === res.data.product._id ? res.data.product : p))
      );
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Product Management</h2>
        <p className="text-gray-600 text-center mb-6">Manage all your products in one place</p>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[75vh] overflow-y-auto scroll-container pb-4">
          {products.map((p) => (
            <div key={p._id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col product-card">
              <div className="relative">
                <img src={p.img} alt={p.name} className="h-40 w-full object-cover" />
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                  ${p.price}
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 truncate">{p.name}</h3>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">{p.description}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < Math.floor(p.ratings || 0) ? 'fill-current' : 'stroke-current'}`} viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({p.ratings?.toFixed(1) || 0})</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => openUpdateModal(p)}
                    className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition text-xs"
                  >
                    <i className="fas fa-edit mr-1"></i> Edit
                  </button>
                  <button
                    onClick={() => { setDeleteProductId(p._id); setShowDeletePopup(true); }}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition text-xs"
                  >
                    <i className="fas fa-trash mr-1"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMoreProducts}
            className="bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-black transition flex items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                <i className="fas fa-plus mr-2"></i> Load More
              </>
            )}
          </button>
        </div>

        {/* Update Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition"
              >
                <i className="fas fa-times"></i>
              </button>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Update Product</h2>

                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      value={currentProduct.name}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                      placeholder="Product Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={currentProduct.description}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                      placeholder="Description"
                      rows="3"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="number"
                        value={currentProduct.price}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                        placeholder="Price"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                      <input
                        type="number"
                        value={currentProduct.stock}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                        placeholder="Stock"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={currentProduct.catogery}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, catogery: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    >
                      <option value="">-- Select Category --</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
                    <img src={mainImageURL} alt="Main" className="w-full h-48 object-contain rounded-lg mb-2 border" />
                    <input 
                      type="file" 
                      onChange={(e) => setMainImageFile(e.target.files[0])} 
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Extra Images</label>
                    <div className="flex gap-2 overflow-x-auto mb-2">
                      {extraImageURLs.map((url, i) => (
                        <div key={i} className="relative flex-shrink-0">
                          <img src={url} alt={`extra-${i}`} className="h-20 w-20 object-cover rounded-lg border" />
                          <button
                            type="button"
                            onClick={() => setExtraImageURLs(extraImageURLs.filter((_, idx) => idx !== i))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center"
                          >
                            <i className="fas fa-times text-xs"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <input 
                      type="file" 
                      multiple 
                      onChange={(e) => setExtraImageFiles([...extraImageFiles, ...Array.from(e.target.files)])} 
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-black transition"
                  >
                    Update Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Popup */}
        {showDeletePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-80 text-center shadow-xl confirmation-dialog">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">Confirm Deletion</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition flex items-center"
                >
                  <i className="fas fa-trash mr-2"></i> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scroll-container {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }
        .scroll-container::-webkit-scrollbar {
          width: 6px;
        }
        .scroll-container::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 20px;
        }
        .scroll-container::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .product-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .confirmation-dialog {
          animation: scaleIn 0.2s ease-out;
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ManageProducts;