import express from "express"; 
import { addToCart, deleteCartItem, getCartItems, clearCart } from "../controllers/cart.controller";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { RoleBasedAuthentication } from "../middlewares/roleBasedAuth.middleware";

const router = express.Router(); 

router.use(ValidateSignatureMiddleWare);

router.use(RoleBasedAuthentication(String(process.env.USER)));
 
router.post("/", addToCart);  

router.get("/", getCartItems);  

router.delete("/:id", deleteCartItem);  

router.delete("/", clearCart);  

export { router as CartRoutes };