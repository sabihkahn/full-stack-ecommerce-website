import exprsss from "express";
import { addToCart, DeleteCartItems, getCartItems } from "../controller/addtocartcontroller.js";
const router = exprsss.Router();


router.post('/add-to-cart/:userID',addToCart)
router.get("/cart/:userID",getCartItems);
router.delete("/cart/:userID/:productID",DeleteCartItems);












export default router;