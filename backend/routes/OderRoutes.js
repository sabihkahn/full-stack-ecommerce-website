import express from "express";
import { createOrder, getAllOrders, getAllPrices, getpendingOder, totaloders, updateOrderStatus } from "../controller/odercontroller.js";
import  authMiddleware  from "../middleware/Authmiddelware.js";
import AdminAuthmiddleware from '../middleware/AdminAuthmiddleware.js'
const router = express.Router();

router.post('/create-oder',authMiddleware, createOrder)
router.get('/all-oders', AdminAuthmiddleware, getAllOrders);
router.put('/update-oder/:id', AdminAuthmiddleware, updateOrderStatus);
router.get('/totaloders',totaloders)
router.get('/getallprices',getAllPrices)
router.get('/getpendingOder',getpendingOder)


export default router;