import express from "express";
import { createVendor, getVendorProfile, updatetVendorProfile, updateVendorLocation, updateVendorService } from '../controllers/vendors.controller'
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware"; 
require('dotenv').config();
const router = express.Router(); 

router.post("/signup", createVendor);    

router.use(ValidateSignatureMiddleWare);  

router.use(RoleBasedAuthentication(String(process.env.VENDOR)));

router.get("/profile", getVendorProfile);

router.patch("/update-profile", updatetVendorProfile);

router.patch("/update-service", updateVendorService);

router.patch("/update-location", updateVendorLocation);

export { router as VendorRoutes };
