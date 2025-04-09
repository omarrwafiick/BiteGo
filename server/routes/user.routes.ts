import express from "express";  
import { uploadUserImage } from "../controllers/main.controller"; 
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { editProfile, getProfile, requestOtp, verifyAccount } from "../controllers/users.controller";
const router = express.Router();  

router.use(ValidateSignatureMiddleWare);

router.patch("/verify-account", verifyAccount);

router.get("/otp", requestOtp);

router.get("/profile", getProfile);

router.patch("/profile", editProfile);

router.post("/uploadimage/:id", uploadUserImage);
 
export { router as UserRoutes };