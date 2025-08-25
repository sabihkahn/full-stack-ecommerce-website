import mongoose from "mongoose";
import product from "./productmodel.js";


export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        }
      }
    ],
    role: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);


const User = mongoose.model("User4", UserSchema);

export default User;
