import express from "express";  
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { approveAccount, createAdmin, deleteEntityById, deleteOrder, getEntity, getEntityById, getOrderById, getOrders, getTransactionById, getTransactions } from "../controllers/admins.controller";
import { updateUserProfile } from "../controllers/users.controller";
require('dotenv').config();

const router = express.Router(); 
 
router.use(ValidateSignatureMiddleWare); 
 
router.use(RoleBasedAuthentication(String(process.env.ADMIN)));
 
router.post("/signup", createAdmin);

router.get("/entity/:type", getEntity); 

router.get("/entity/:id/:type", getEntityById); 

router.delete("/entity/:id/:type", deleteEntityById);  

router.post("/transactions", getTransactions);

router.post("/transaction/:id", getTransactionById);

router.patch("/approve-account/:id/:type", approveAccount); 

router.get("/order", getOrders); 

router.get("/order/:id", getOrderById); 

router.patch("/update-user", updateUserProfile); 
 
router.delete("/order/:id", deleteOrder);  

export { router as AdminRoutes };

