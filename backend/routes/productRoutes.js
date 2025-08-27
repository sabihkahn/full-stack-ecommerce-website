import express from "express";
import mongoose from "mongoose";
import { createProduct, deleteProduct, filterProducts, getProduct, getSingleproduct, searchProducts, updateProduct } from "../controller/productcontroller.js";
import AdminAuthmiddleware from "../middleware/AdminAuthmiddleware.js";

const router = express.Router()

router.post('/create-product', AdminAuthmiddleware, createProduct)
router.get('/get-product/:loadmore', getProduct)
router.put('/update-product/:id', AdminAuthmiddleware, updateProduct)
router.delete('/delete-product/:id', AdminAuthmiddleware, deleteProduct)
router.get("/search", searchProducts);
router.get("/filter", filterProducts);
router.get('/getSingleProduct/:id', getSingleproduct);

export default router;