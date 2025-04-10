import express from "express";   
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware"; 
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
import { CreateDelivey, editDeliveryProfile, getDeliveryProfile, updateDeliveryLocation, updateDeliveyStatus } from "../controllers/delivery.controller";

const router = express.Router();   

router.post("/", CreateDelivey); 

router.use(ValidateSignatureMiddleWare); 

router.use(RoleBasedAuthentication(String(process.env.DELIVERY)));
 
router.get("/profile", getDeliveryProfile);
 
router.patch("/profile", editDeliveryProfile); 
 
router.patch("/location", updateDeliveryLocation);

router.patch("/status", updateDeliveyStatus);
 
export { router as DeliveryRoutes };