import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import gsap from "gsap";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const toastRef = useRef(null);
 const token = localStorage.getItem('token')
 console.log(token)
  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Fetch Orders from API and resolve products
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/getpendingOder`);
      const rawOrders = res.data.pendingOders;

      // Fetch product details for each order
      const resolvedOrders = await Promise.all(
        rawOrders.map(async (order) => {
          const productsWithDetails = await Promise.all(
            order.products.map(async (item) => {
              try {
                const productRes = await axios.get(
                  `${import.meta.env.VITE_BASE_URL}/getSingleProduct/${item.product}`
                );
                return {
                  ...item,
                  productDetails: productRes.data.product,
                };
              } catch (error) {
                console.error("Failed to fetch product", item.product);
                return {
                  ...item,
                  productDetails: null,
                };
              }
            })
          );

          return {
            ...order,
            products: productsWithDetails,
          };
        })
      );

      setOrders(resolvedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      showToast("Failed to fetch orders", "error");
    }
  };

  // ✅ Confirm order handler
  const confirmOrder = async (id) => {
  const token = localStorage.getItem("token");

  try {
    await axios.put(
      `${import.meta.env.VITE_BASE_URL}/update-oder/${id}`,
      {
        status: "confirmed",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders((prev) => prev.filter((o) => o._id !== id));
    showToast("Order confirmed successfully", "success");
  } catch (error) {
    console.error("Confirm Order Error:", error.response?.data || error.message);
    showToast("Failed to confirm order", "error");
  }
};
  // ✅ Toast function
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  // ✅ Animate toast after it's shown
  useEffect(() => {
    if (toast.show && toastRef.current) {
      gsap.fromTo(
        toastRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );

      const timeout = setTimeout(() => {
        gsap.to(toastRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => setToast({ show: false, message: "", type: "" }),
        });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [toast.show]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* ✅ Toast */}
      {toast.show && (
        <div
          ref={toastRef}
          className={`toast fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      {/* ✅ Order List */}
      <div className="bg-white rounded-lg shadow-md p-4 max-h-[70vh] overflow-y-auto">
        {orders.length === 0 ? (
          <p className="text-gray-500">No pending orders 🎉</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="p-4 mb-3 border rounded-lg space-y-2"
            >
              <div>
                <p><strong>📍 Location:</strong> {order.location}</p>
                <p><strong>📞 Phone:</strong> {order.phone}</p>
                <p><strong>🧾 Total Price:</strong> ${order.totalPrice}</p>
                <p><strong>📦 Products:</strong></p>

                <ul className="pl-4 list-disc">
                  {order.products.map((p) => (
                    <li key={p._id}>
                      {p.productDetails ? (
                        <>
                          {p.productDetails.name} – Qty: {p.quantity}
                        </>
                      ) : (
                        <>Unknown Product (ID: {p.product}) – Qty: {p.quantity}</>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => confirmOrder(order._id)}
                className="bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition"
              >
                Confirm
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
