import express from "express";
import mongoose from "mongoose";
import { createProduct, getProduct, updateProduct } from "../controller/productcontroller.js";

const router = express.Router()

router.post('/create-product',createProduct)
router.get('/get-product/:loadmore',getProduct)
router.put('/update-product/:id',updateProduct)

export default router;