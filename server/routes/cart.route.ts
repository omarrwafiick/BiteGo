import express from "express"; 
import { manageCart, deleteCartItem, getCartItems, clearCart, updateCart } from "../controllers/cart.controller";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
require('dotenv').config();

const router = express.Router(); 

router.use(ValidateSignatureMiddleWare);

router.use(RoleBasedAuthentication(String(process.env.USER)));

router.put("/", updateCart);   
 
router.post("/", manageCart);  
 
router.get("/", getCartItems);  

router.delete("/deleteitem/:id", deleteCartItem);  

router.delete("/clear", clearCart);  

export { router as CartRoutes };