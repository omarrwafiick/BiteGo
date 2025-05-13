import express from "express";   
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { CreateUser, updateUserProfile, getUserProfile, requestOtp, updateUserLocation, verifyUserAccount } from "../controllers/users.controller";
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
import { createOrder } from "../controllers/order.controller";
import { contact } from "../controllers/users.controller";
require('dotenv').config();

const router = express.Router();  

router.post("/signup", CreateUser);

router.post("/contact", contact); 

router.use(ValidateSignatureMiddleWare); 

router.use(RoleBasedAuthentication(String(process.env.USER))); 

router.post("/user/order", createOrder); 

router.patch("/verify-account", verifyUserAccount);

router.get("/otp", requestOtp);

router.get("/profile", getUserProfile);

router.patch("/update-profile", updateUserProfile); 

router.patch("/update-location", updateUserLocation);

export { router as UserRoutes };