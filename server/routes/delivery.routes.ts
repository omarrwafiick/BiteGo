import express from "express";   
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware"; 
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
import { CreateDelivey, updateDeliveryProfile, getDeliveryProfile, updateDeliveryLocation, updateDeliveyStatus } from "../controllers/delivery.controller";
require('dotenv').config();
const router = express.Router();   

router.post("/signup", CreateDelivey); 

router.use(ValidateSignatureMiddleWare); 

router.use(RoleBasedAuthentication(String(process.env.DELIVERY)));
 
router.get("/profile", getDeliveryProfile);
 
router.patch("/update-profile", updateDeliveryProfile); 
 
router.patch("/update-location", updateDeliveryLocation);

router.patch("/update-status", updateDeliveyStatus);
 
export { router as DeliveryRoutes };