import express from "express";   
import { getOrderDetails, getUserOrders, getVendorOrders, updateVendorOrder, createOrder, getDeliveryOrders, getOrderStatus } from "../controllers/order.controller"; 
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
require('dotenv').config();
const router = express.Router(); 

router.use(ValidateSignatureMiddleWare);   

router.get("/:id", getOrderDetails);  

//vendor
router.use(RoleBasedAuthentication(String(process.env.VENDOR)));

router.get("/vendor/all", getVendorOrders);  

router.put("/vendor/:id/process", updateVendorOrder);  

//user 
router.use(RoleBasedAuthentication(String(process.env.USER)));

router.post("/user", createOrder);

router.get("/user/all", getUserOrders);  

router.get("user/status", getOrderStatus);  

//delivery 
router.use(RoleBasedAuthentication(String(process.env.DELIVERY)));
  
router.get("/delivery/all", getDeliveryOrders);  
   
export { router as OrderRoute };