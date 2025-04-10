import express from "express";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { addUserPayment } from "../controllers/payment.controller";
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";

const router = express.Router(); 
 
router.use(ValidateSignatureMiddleWare);  

router.use(RoleBasedAuthentication(String(process.env.USER)));

router.post("/payment",  addUserPayment);

export { router as PaymentRoutes };