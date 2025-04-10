import express from "express";  
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { approveAccount, createAdmin, deleteEntityById, deleteOrder, getEntity, getEntityById, getOrderById, getOrders, getTransactionById, getTransactions } from "../controllers/admins.controller";

const router = express.Router();

router.post("/signup", createAdmin);
 
router.use(ValidateSignatureMiddleWare);
 
router.use(RoleBasedAuthentication(String(process.env.ADMIN)));

router.get("/entity", getEntity); 

router.get("/entity/:id", getEntityById); 

router.delete("/entity/:id", deleteEntityById);  

router.post("/transactions", getTransactions);

router.post("/transaction/:id", getTransactionById);

router.post("/approve-account", approveAccount); 

router.get("/order", getOrders); 

router.get("/order/:id", getOrderById); 
 
router.delete("/order/:id", deleteOrder);  

export { router as AdminRoutes };

