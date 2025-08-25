import express from "express";
import { createOrder, getAllOrders, updateOrderStatus } from "../controller/odercontroller.js";
import  authMiddleware  from "../middleware/Authmiddelware.js";
import AdminAuthmiddleware from '../middleware/AdminAuthmiddleware.js'
const router = express.Router();

router.post('/create-oder',authMiddleware, createOrder)
router.get('/all-oders', AdminAuthmiddleware, getAllOrders);
router.put('/update-oder/:id', AdminAuthmiddleware, updateOrderStatus);
export default router;