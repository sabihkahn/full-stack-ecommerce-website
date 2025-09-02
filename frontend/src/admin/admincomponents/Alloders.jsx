import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/all-oders`,
        {
          headers: { Authorization: token },
        }
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        All Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders available.</p>
      ) : (
        <div className="max-h-[80vh] overflow-y-auto px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow hover:shadow-md transition flex flex-col"
              >
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold text-indigo-700 mb-3">
                    Order ID: {order._id.slice(-6)}
                  </h2>

                  <div className="space-y-1 text-sm text-gray-700 flex-1">
                    <p>
                      <span className="font-semibold">User:</span>{" "}
                      {order.user?.username || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {order.user?.email || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {order.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {order.location}, {order.city}, {order.provience}
                    </p>
                    <p>
                      <span className="font-semibold">Zip:</span> {order.zip}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span className="text-green-600">{order.status}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Total:</span> $
                      {order.totalPrice}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold mb-2">Products:</p>
                    <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
                      {order.products.map((item) => (
                        <li
                          key={item._id}
                          className="flex items-start gap-3 border border-gray-100 p-2 rounded-md bg-gray-50"
                        >
                          <img
                            src={item.product?.img}
                            alt={item.product?.name}
                            className="w-16 h-16 object-cover rounded-md border flex-shrink-0"
                          />
                    
                          <div className="flex flex-col text-sm flex-1">
                            <p className="font-medium text-gray-800">
                              {item.product?.name}
                            </p>
                            <p className="text-gray-600">Qty: {item.quantity}</p>
                            <p className="text-gray-600">
                              Price: ${item.product?.price}
                            </p>
                            <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                              {item.product?.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 text-xs text-gray-500 text-right rounded-b-lg">
                  Ordered on: {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
