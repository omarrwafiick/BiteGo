import express from "express";
import { createVendor, getVendorByID, getVendors, getVendorProfile, updatetVendorProfile, updateVendorService } from '../controllers/vendors.controller'
import { vendorLogin } from "../controllers/auth.controller";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";

const router = express.Router(); 

router.get("/", getVendors);

router.get("/:id", getVendorByID);

router.get("/profile", ValidateSignatureMiddleWare, getVendorProfile);

router.patch("/profile", ValidateSignatureMiddleWare, updatetVendorProfile);

router.patch("/service", ValidateSignatureMiddleWare, updateVendorService);
 
router.post("/", createVendor);

router.post("/login", vendorLogin);

export { router as VendorRoutes };
