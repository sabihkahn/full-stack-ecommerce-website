import mongoose from "mongoose";
import express from "express";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true
    },
    catogery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catogery',
        required: true
    },
    brand: {
        type: String,
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    allrating: [
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User4" },
    value: { type: Number, min: 1, max: 5 }
  }
],

    discount: {
        type: Number,
        default: 0
    },
    extraimages: [
        {
            type: String
        }
    ]
})

export default mongoose.model('Product', productSchema)