import mongoose from "mongoose";
import express from "express";
import Product from "../models/productmodel.js";
import productmodel from "../models/productmodel.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, img, catogery, brand, stock, ratings, discount, extraimages } = req.body;

        if (!name || !description || !price || !img || !catogery || !stock) {
            return res.status(400).json({ message: 'All fields are required to create products' })
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            img,
            catogery,
            brand,
            stock,
            ratings,
            discount,
            extraimages
        });
        res.status(201).json(
            {
                message: 'Product created successfully',
                product: newProduct
            }
        );

    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Cant create product' });
    }

}

export const getProduct = async (req, res) => {
    try {
        const { loadmore } = req.params;

        const limit = parseInt(loadmore) || 10;

        const allproducts = await Product.find({}).limit(limit).sort({ createdAt: -1 });
        res.status(200).json({
            message: 'all products are fetched seccessfully',
            products: allproducts
        })

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Cant fetch products' });
    }

}
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).send({
            message: 'Product updated successfully',
            product: updatedProduct
        })
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Cant update product' });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).send({
            message: 'Product deleted successfully',
            product: deletedProduct
        })

    } catch (error) {
        console.log(error);

    }
}


export const searchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const products = await Product.find({
            $or: [
                { name: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } }
            ]
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error searching products", error });
    }
};


export const filterProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice } = req.query;

        let filter = {};

        if (category) {
            filter.catogery = category
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error filtering products", error });
    }
};

export const getSingleproduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: 'Category not found'
            });
        }
        const getSingleproduct = await Product.findById(id)
        res.status(200).json({
            message: 'Category products fetched successfully',
            products: getSingleproduct
        })

    } catch (error) {
        console.error('Error fetching category products:', error);
        res.status(500).json({ message: 'Cant fetch category products' });
    }
}


export const updatetherating = async (req, res) => {
    const { id, userId } = req.params;
    const { rating } = req.body;

    try {
        if (!id) {
            return res.status(400).send({ message: 'Product id is required' });
        }

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).send({ message: 'Rating must be between 1 and 5' });
        }

        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        // ✅ only check entries with a valid user
        const existingRating = product.allrating.find(r => 
            r.user && r.user.toString() === userId
        );

        if (existingRating) {
            return res.status(400).send({ message: "You have already rated this product" });
        }

        // ✅ always push with user + value
        product.allrating.push({ user: userId, value: rating });

        // ✅ recalc average
        let sum = product.allrating.reduce((acc, r) => acc + (r.value || 0), 0);
        let totalrating = sum / product.allrating.length;

        product.ratings = totalrating;
        await product.save();

        res.status(200).send({
            message: "Your rating has been added successfully",
            ratings: product.ratings,
            allrating: product.allrating
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Cannot update the rating' });
    }
};
export const totalearning = async(req,res)=>{
    try {
        const price = (await Product.find({})).map((e)=>{
            return e.price
        })
        let totalsum = 0
        for(let i = 0; i< price.length;i++){
            totalsum += price[i]
        }
        res.status(200).send({message:"the price extracted successfully",totalprice:totalsum})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"cant get toatl earning"})
        
    }
}
export const totalProducts = async(req,res)=>{
    try {
        const totalproducts = (await Product.find({})).length
        
        res.status(200).send({message:"the totalproducts extracted successfully",totalproducts:totalproducts})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"cant get totalproducts"})
        
    }
}
