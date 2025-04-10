import express from "express";   
import { getUserOrderDetails, getUserOrders, getVendorOrders, getVendorOrderDetails, updateVendorOrder } from "../controllers/order.controller"; 
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";

const router = express.Router(); 

router.use(ValidateSignatureMiddleWare);  

//user
router.use(RoleBasedAuthentication(String(process.env.USER)));

router.get("/user/:id", getUserOrderDetails);  

router.get("/user", getUserOrders);  

//vendor
router.use(RoleBasedAuthentication(String(process.env.VENDOR)));

router.get("/vendor", getVendorOrders); 

router.get("/vendor/:id", getVendorOrderDetails);  

router.put("/vendor/:id/process", updateVendorOrder);  
   
export { router as OrderRoute };