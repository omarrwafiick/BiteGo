import express from "express";
import { createVendor, getVendorByID, getVendors, getVendorProfile, updatetVendorProfile, updateVendorService } from '../controllers/vendors.controller'
import { Login } from "../controllers/auth.controller";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";

const router = express.Router(); 
 
router.post("/", createVendor);

router.post("/login", Login);

router.get("/", getVendors);

router.get("/:id", getVendorByID);

router.use(ValidateSignatureMiddleWare);

router.get("/profile", getVendorProfile);

router.patch("/profile", updatetVendorProfile);

router.patch("/service", updateVendorService);

export { router as VendorRoutes };
