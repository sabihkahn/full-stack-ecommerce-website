import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";


const AdminAuthmiddleware = async (req, res, next) => {
  try {

    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid token, user not found" });
    }


    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default AdminAuthmiddleware;
