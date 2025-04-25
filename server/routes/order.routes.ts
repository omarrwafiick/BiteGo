import express from "express";   
import { getUserOrderDetails, getUserOrders, getVendorOrders, getVendorOrderDetails, updateVendorOrder } from "../controllers/order.controller"; 
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
require('dotenv').config();
const router = express.Router(); 

router.use(ValidateSignatureMiddleWare);   

//vendor
router.use(RoleBasedAuthentication(String(process.env.VENDOR)));

router.get("/vendor", getVendorOrders); 

router.get("/vendor/:id", getVendorOrderDetails);  

router.put("/vendor/:id/process", updateVendorOrder);  

//user
router.use(RoleBasedAuthentication(String(process.env.USER)));

router.get("/user/:id", getUserOrderDetails);  

router.get("/user", getUserOrders);  
   
export { router as OrderRoute };