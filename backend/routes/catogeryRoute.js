import express from "express";
import mongoose from "mongoose";
import { createCatogery, deleteCatogery, getCatogery, totalcatogries, updateCatogery } from "../controller/catogerycontroller.js";
import AdminAuthmiddleware from "../middleware/AdminAuthmiddleware.js";

const router = express.Router();

router.post('/createCatogery',AdminAuthmiddleware,createCatogery)

router.get('/getCatogery',getCatogery)

router.put('/updateCatogery/:id',AdminAuthmiddleware,updateCatogery)

router.delete('/deleteCatogery/:id',AdminAuthmiddleware,deleteCatogery)
router.get('/totalcatogries',totalcatogries)

export default router;