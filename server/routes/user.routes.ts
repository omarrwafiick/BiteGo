import express from "express";   
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { CreateUser, editUserProfile, getUserProfile, requestOtp, updateUserLocation, verifyUserAccount } from "../controllers/users.controller";
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
import { createOrder } from "../controllers/order.controller";

const router = express.Router();  

router.post("/signup", CreateUser);

router.use(ValidateSignatureMiddleWare); 

router.use(RoleBasedAuthentication(String(process.env.USER))); 

router.post("/user", createOrder); 

router.patch("/verify-account", verifyUserAccount);

router.get("/otp", requestOtp);

router.get("/profile", getUserProfile);

router.patch("/profile", editUserProfile); 

router.patch("/location", updateUserLocation);
 
export { router as UserRoutes };