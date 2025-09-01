import express from "express";
import mongoose from "mongoose";
import Catogery from "../models/catogerymodel.js";
import Product from "../models/productmodel.js";

export const createCatogery = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Catogery name is required' });
    }

    const existingCatogery = await Catogery.findOne({ name });
    if (existingCatogery) {
      return res.status(400).json({ message: 'Catogery already exists' });
    }
    
    const Createcatogery = await Catogery.create({ name });

    res.status(201).json({ message: 'Catogery created successfully', catogery: Createcatogery });
  } catch (error) {
    console.error('Error creating catogery:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export const getCatogery = async (req, res) => {
  try {
    const catogeries = await Catogery.find();
    res.status(200).json(catogeries);
  } catch (error) {
    console.error('Error fetching catogeries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export const updateCatogery = async (req, res) => {
  try {
    const { id } = req.params;
    const { newname } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid catogery ID' });
    }

    const catogery = await Catogery.findById(id);
    if (!catogery) {
      return res.status(404).json({ message: 'Catogery not found' });
    }

    if (!newname) {
      return res.status(400).json({ message: 'Catogery name is required' });
    }
    catogery.name = newname;
    await catogery.save();
   

    res.status(200).json({ message: 'Catogery updated successfully', catogery });
  } catch (error) {
    console.error('Error updating catogery:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteCatogery = async (req, res) => {
  try {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid catogery ID" });
    }

   
    const catogery = await Catogery.findById(id);
    if (!catogery) {
      return res.status(404).json({ message: "Catogery not found" });
    }

    
    const productCount = await Product.countDocuments({ catogery: id });
    if (productCount > 0) {
      return res.status(400).json({
        message: "Cannot delete catogery with existing products",
      });
    }

    await Catogery.findByIdAndDelete(id);

    res.status(200).json({ message: "Catogery deleted successfully" });
  } catch (error) {
    console.error("Error deleting catogery:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export const totalcatogries = async (req,res) =>{
try {
  const totalcatogries = (await Catogery.find({})).length
  res.status(200).send({totalcatogries:totalcatogries})
  
} catch (error) {
  console.log(error);
  res.status(500).send({message:"cant get total catogries"})
  
}

}