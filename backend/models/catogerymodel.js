import express from "express";
import mongoose from "mongoose";

const catogerySchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        unique: true

    }


},{timestamps:true})

export default mongoose.model('Catogery',catogerySchema)