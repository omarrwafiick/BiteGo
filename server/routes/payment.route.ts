import express from "express";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { addUserPayment } from "../controllers/payment.controller";

const router = express.Router(); 
 
router.use(ValidateSignatureMiddleWare); 

router.post("/payment",  addUserPayment);

export { router as PaymentRoutes };