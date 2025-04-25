import express from "express";   
import { checkAuth, forgetPassword, login, logOut, resetPassword } from "../controllers/auth.controller";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware"; 

const router = express.Router(); 
 
router.post("/login", login); 

router.use(ValidateSignatureMiddleWare);
 
router.post("/logout", logOut);

router.post("/forget-password/:type", forgetPassword);

router.post("/reset-password/:type/:token", resetPassword);

router.post("/check-auth/:type", checkAuth); 
 
export { router as AuthRoutes };