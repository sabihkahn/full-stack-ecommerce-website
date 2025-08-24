import mongoose from "mongoose";
import express from "express";


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
      
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    img:{
        type:String,
        required:true
    },
    catogery:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Catogery',
        required:true
    },
    brand:{
        type:String,
        
    },
    stock:{
        type:Number,
        required:true,
        default:0
    }
})

export default mongoose.model('Product',productSchema)