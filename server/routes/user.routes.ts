import express from "express";  
import { uploadUserImage } from "../controllers/main.controller";
import { Login } from "../controllers/auth.controller";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { editProfile, getProfile, requestOtp, signUp, verifyAccount } from "../controllers/users.controller";
const router = express.Router(); 
 
router.post("/signup", signUp);

router.post("/login", Login);

router.use(ValidateSignatureMiddleWare);

router.patch("/verify-account", verifyAccount);

router.get("/otp", requestOtp);

router.get("/profile", getProfile);

router.patch("/profile", editProfile);

router.post("/uploadimage/:id", uploadUserImage);
 
export { router as UserRoutes };