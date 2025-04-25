import express from "express";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { addTransaction } from "../controllers/transaction.controller";
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
require('dotenv').config();
const router = express.Router(); 
 
router.use(ValidateSignatureMiddleWare);  

router.use(RoleBasedAuthentication(String(process.env.USER)));

router.post("/payment",  addTransaction);

export { router as PaymentRoutes };