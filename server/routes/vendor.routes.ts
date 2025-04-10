import express from "express";
import { createVendor, getVendorProfile, updatetVendorProfile, updateVendorLocation, updateVendorService } from '../controllers/vendors.controller'
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware"; 

const router = express.Router(); 

router.post("/signup", createVendor);   

router.use(ValidateSignatureMiddleWare); 

router.use(RoleBasedAuthentication(String(process.env.VENDOR)));

router.get("/profile", getVendorProfile);

router.patch("/profile", updatetVendorProfile);

router.patch("/service", updateVendorService);

router.patch("/location", updateVendorLocation);

export { router as VendorRoutes };
