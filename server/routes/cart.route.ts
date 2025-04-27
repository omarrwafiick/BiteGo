import express from "express"; 
import { addToCart, deleteCartItem, getCartItems, clearCart } from "../controllers/cart.controller";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
require('dotenv').config();

const router = express.Router(); 

router.use(ValidateSignatureMiddleWare);

router.use(RoleBasedAuthentication(String(process.env.USER)));
 
router.post("/", addToCart);  
 
router.get("/", getCartItems);  

router.delete("/deleteitem/:id", deleteCartItem);  

router.delete("/clear", clearCart);  

export { router as CartRoutes };