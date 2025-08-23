import mongoose from "mongoose";

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
  },
  { timestamps: true }
);


const User = mongoose.model("User4", UserSchema);

export default User;
