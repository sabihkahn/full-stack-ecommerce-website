import express from "express";
import mongoose from "mongoose";
import { createCatogery, deleteCatogery, getCatogery, updateCatogery } from "../controller/catogerycontroller.js";

const router = express.Router();

router.post('/createCatogery',createCatogery)

router.get('/getCatogery',getCatogery)

router.put('/updateCatogery/:id',updateCatogery)

router.delete('/deleteCatogery/:id',deleteCatogery)

export default router;