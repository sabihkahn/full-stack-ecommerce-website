import express from "express";
import mongoose from "mongoose";
import User from "../models/usermodel.js";
import Product from "../models/productmodel.js";

export const addToCart = async (req, res) => {
    try {
        const { userID } = req.params;
        const { productID, quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        if (!mongoose.Types.ObjectId.isValid(productID)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingProductIndex = user.cart.findIndex(
            (item) => item.product.toString() === productID
        );

        if (existingProductIndex >= 0) {
   
            user.cart[existingProductIndex].quantity += quantity;
        } else {
      
            user.cart.push({ product: productID, quantity });
        }

        await user.save();


        await user.populate("cart.product");

        res.status(200).json({
            message: "Product added to cart successfully",
            cart: user.cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "cant add to cart product" });
    }
};

export const DeleteCartItems = async (req, res) => {
const { userID } = req.params;
const { productID } = req.params;
try {
    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(productID)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    const user = await User.findById(userID);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const productIndex = user.cart.findIndex(
        (item) => item.product.toString() === productID
    );

    if (productIndex >= 0) {
        user.cart.splice(productIndex, 1);
        await user.save();
        await user.populate("cart.product");
        res.status(200).json({
            message: "Product removed from cart successfully",
            cart: user.cart,
        });
    } else {
        res.status(404).json({ message: "Product not found in cart" });
    }
    
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "cant delete cart product" });
}



}

export const getCartItems = async (req, res) => {
    const { userID } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await User.findById(userID).populate("cart.product");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            cart: user.cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "cant get cart product" });
    }
}