import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateProduct() {
  const [mainImage, setMainImage] = useState(null);
  const [mainImageURL, setMainImageURL] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [extraImageURLs, setExtraImageURLs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    catogery: "",
    brand: "",
    stock: 0,
    ratings: 0,
    discount: 0,
  });
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const showToast = (message, type = "info", duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/getCatogery`
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        showToast("❌ Failed to fetch categories.", "error");
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setFormData({ ...formData, catogery: categoryId });
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

  const handleMainImageUpload = async () => {
    if (!mainImage) return showToast("⚠️ Please select a main image first.", "error");
    try {
      const url = await uploadToCloudinary(mainImage);
      setMainImageURL(url);
      showToast("✅ Main image uploaded!", "success");
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to upload main image.", "error");
    }
  };

  const handleExtraImagesUpload = async () => {
    if (extraImages.length < 1 && extraImageURLs.length < 3)
      return showToast("⚠️ Please upload at least 3 extra images.", "warning");

    try {
      const urls = await Promise.all(extraImages.map((f) => uploadToCloudinary(f)));
      setExtraImageURLs((prev) => [...prev, ...urls]);
      setExtraImages([]);
      showToast("✅ Extra images uploaded!", "success");
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to upload extra images.", "error");
    }
  };

  const handleRemoveExtraImage = (index) => {
    setExtraImageURLs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainImageURL) return showToast("⚠️ Please upload a main image first.", "error");
    if (extraImageURLs.length < 3) return showToast("⚠️ Please upload at least 3 extra images.", "warning");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create-product`,
        { ...formData, img: mainImageURL, extraimages: extraImageURLs },
        { headers: { Authorization: `${token}` } }
      );
      console.log("Product created:", res.data);
      showToast("🎉 Product created successfully!", "success");

      // Reset all fields
      setFormData({
        name: "",
        description: "",
        price: "",
        catogery: "",
        brand: "",
        stock: 0,
        ratings: 0,
        discount: 0,
      });
      setMainImage(null);
      setMainImageURL(null);
      setExtraImages([]);
      setExtraImageURLs([]);
      setSelectedCategory("");
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to create product.", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 relative">
      {/* Toast container */}
      <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded shadow text-white font-medium transition-transform transform ${
              t.type === "success"
                ? "bg-green-500"
                : t.type === "error"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200 flex flex-col gap-6 h-[90vh] overflow-y-scroll "
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">Create Product</h2>

        {/* Main Image */}
        <div className="flex flex-col items-center">
          {mainImageURL ? (
            <img
              src={mainImageURL}
              alt="Main"
              className="w-full h-64 object-cover rounded-xl border mb-4"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl mb-4 text-gray-500">
              Upload Main Image
            </div>
          )}
          <div className="flex gap-0 w-full">
            <input type="file" onChange={(e) => setMainImage(e.target.files[0])} className="flex-1" />
            <button
              type="button"
              onClick={handleMainImageUpload}
              className="bg-black text-white px-2 right-2 relative py-2 rounded-xl hover:bg-gray-800 transition"
            >
              Upload
            </button>
          </div>
        </div>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-medium">Price ($)</span>
            <input
              type="number"
              className="p-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="font-medium">Product Name</span>
            <input
              type="text"
              className="border p-2 w-full rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="font-medium">Category</span>
            <select className="border p-2 w-full rounded" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="font-medium">Brand</span>
            <input
              type="text"
              className="p-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="font-medium">Stock Quantity</span>
            <input
              type="number"
              className="p-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="font-medium">Initial Ratings (0–5)</span>
            <input
              type="number"
              className="p-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={formData.ratings}
              onChange={(e) => setFormData({ ...formData, ratings: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="font-medium">Discount (%)</span>
            <input
              type="number"
              className="p-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            />
          </label>
        </div>

        <label className="block">
          <span className="font-medium">Description</span>
          <textarea
            className="p-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-black"
            rows="5"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </label>

        {/* Extra Images */}
        <div>
          <span className="font-medium">Extra Images (Min 3)</span>
          <div className="flex gap-0 mt-2">
            <input
              type="file"
              multiple
              onChange={(e) =>
                setExtraImages((prev) => [...prev, ...Array.from(e.target.files)])
              }
              className="flex-1"
            />
            <button
              type="button"
              onClick={handleExtraImagesUpload}
              className="bg-black text-white relative right-7 px-4 py-2 rounded-xl hover:bg-gray-800 transition"
            >
              Upload
            </button>
          </div>
          {extraImageURLs.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {extraImageURLs.map((url, i) => (
                <div key={i} className="relative">
                  <img src={url} alt={`extra-${i}`} className="w-full h-24 object-cover rounded-lg shadow" />
                  <button
                    type="button"
                    onClick={() => handleRemoveExtraImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white px-1 rounded-full"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition font-medium"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
