import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User4",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  phone: {
    type: Number,
    required:true
  },
  location: {
    type: String,
    required:true
  },
  zip: {
    type: String,
    required:true
  },
  city: {
    type: String,
    required:true
  },
  provience: {
    type: String,
    required:true

  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
