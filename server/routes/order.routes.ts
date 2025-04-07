import express from "express";   
import { createOrder, getUserOrderDetails, getUserOrders, getVendorOrders, getVendorOrderDetails, updateVendorOrder } from "../controllers/order.controller"; 

const router = express.Router(); 
 
//user
router.post("/user", createOrder); 

router.get("/user/:id", getUserOrderDetails);  

router.get("/user", getUserOrders);  

//vendor
router.get("/vendor", getVendorOrders); 

router.get("/vendor/:id", getVendorOrderDetails);  

router.put("/vendor/:id/process", updateVendorOrder);  
   
export { router as OrderRoute };