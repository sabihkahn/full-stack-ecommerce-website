import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageCatogries = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
const [toast, setToast] = useState({ show: false, message: "", type: "" });
const showToast = (message, type = "info") => {
  setToast({ show: true, message, type });
  setTimeout(() => {
    setToast({ show: false, message: "", type: "" });
  }, 3000);
};

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/getCatogery`);
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateOrUpdate = async () => {
    if (!name) return;

    setLoading(true);
    try {
      if (editId) {
        // Update
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/updateCatogery/${editId}`,
          { newname: name },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
      } else {
        // Create
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/createCatogery`,
          { name },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
      }

      setName("");
      setEditId(null);
      fetchCategories();
    } catch (error) {
      console.error("Failed to create/update category", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this category?")) return;

  try {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/deleteCatogery/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    fetchCategories();
    showToast("Category deleted successfully", "success");
  } catch (error) {
    console.error("Failed to delete category", error.response?.data || error.message);
    const msg = error.response?.data?.message || "Failed to delete category";
    showToast(msg, "error");
  }
};

  const handleEdit = (category) => {
    setName(category.name);
    setEditId(category._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-64"
        />
        <button
          onClick={handleCreateOrUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {editId ? "Update" : "Create"}
        </button>
        {editId && (
          <button
            onClick={() => {
              setName("");
              setEditId(null);
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Category List */}
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="flex justify-between items-center border p-3 rounded-md bg-white shadow-sm"
          >
            <span>{cat.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(cat)}
                className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCatogries;
