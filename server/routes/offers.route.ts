import express from "express";
import { getVendorOffers, addVendorOffers, updateOffers, removeVendorFromOffer, getUserOffers, verifyUserOffer } from '../controllers/offer.controller'
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
require('dotenv').config();
const router = express.Router(); 
 
router.use(ValidateSignatureMiddleWare);

//user 
router.get("/user/:pincode", RoleBasedAuthentication(String(process.env.USER)), getUserOffers);

router.get("/user/verify/:id", RoleBasedAuthentication(String(process.env.USER)), verifyUserOffer);

router.get("/vendor", getVendorOffers);

//vendor
router.use(RoleBasedAuthentication(String(process.env.VENDOR)));

router.post("/vendor", addVendorOffers);

router.put("/vendor/:id", updateOffers); 

router.delete("/vendor/:id", removeVendorFromOffer);  

export { router as OfferRoutes };