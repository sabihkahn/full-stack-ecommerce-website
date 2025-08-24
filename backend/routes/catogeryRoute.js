import express from "express";
import mongoose from "mongoose";
import { createCatogery, deleteCatogery, getCatogery, updateCatogery } from "../controller/catogerycontroller.js";
import AdminAuthmiddleware from "../middleware/AdminAuthmiddleware.js";

const router = express.Router();

router.post('/createCatogery',AdminAuthmiddleware,createCatogery)

router.get('/getCatogery',getCatogery)

router.put('/updateCatogery/:id',AdminAuthmiddleware,updateCatogery)

router.delete('/deleteCatogery/:id',AdminAuthmiddleware,deleteCatogery)

export default router;