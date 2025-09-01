// controllers/orderController.js
// Update the import statement to match the actual file name
import Order from "../models/Odermodel.js";
import User from "../models/usermodel.js";

export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const {phone,location,zip,city,provience} = req.body
        const user = await User.findById(userId).populate("cart.product");

        if (!user || user.cart.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }


        let total = 0;
        const products = user.cart.map(item => {
            total += item.product.price * item.quantity;
            return {
                product: item.product._id,
                quantity: item.quantity,
            };
        });

        const newOrder = new Order({
            user: userId,
            products,
            totalPrice: total,
            phone,
            location,
            zip,
            city,
            provience
        });

        await newOrder.save();


        user.cart = [];
        await user.save();

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user").populate("products.product");
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const totaloders = async(req,res)=>{
    try {
        const totaloders = (await Order.find({})).length
        res.status(200).send({message:"toal oder are fetched",totaloders})
    } catch (error) {
       console.log(error) 
       res.status(500).send({message:"CANT GET TOTAL ODERS"})
    }
}

export const getAllPrices = async (req,res)=>{
    try {
        const price = (await Order.find({})).filter((e)=>{
          return e.totalPrice > 0

        })
        let sum = 0 
        for(let i = 0; i< price.length; i++){
            sum = sum + price[i]
        }
        
    } catch (error) {
        console.log(error);
        res.status(200).send({message:"cant get all pices"})

    }
}

export const getpendingOder = async(req,res)=>{
    try {
       
        const pendingoder = (await Order.find({})).filter((e)=>{
            return e.pendingoder
            
        })
        
       
    } catch (error) {
        console.log(error);
        res.status(200).send({message:"cant get pending oders"})
        
    }
}