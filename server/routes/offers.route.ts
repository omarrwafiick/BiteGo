import express from "express";
import { getVendorOffers, addVendorOffers, updateOffers, removeVendorFromOffer, getUserOffers, verifyUserOffer } from '../controllers/offer.controller'
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";

const router = express.Router(); 
 
router.use(ValidateSignatureMiddleWare);

//vendor
router.use(RoleBasedAuthentication(String(process.env.VENDOR)));

router.get("/vendor", getVendorOffers);

router.post("/vendor", addVendorOffers);

router.put("/vendor/:id", updateOffers);

router.delete("/vendor/:id", removeVendorFromOffer);  

//user
router.use(RoleBasedAuthentication(String(process.env.USER)));

router.get("/user/:pincode", getUserOffers);

router.get("/user/verify/:id", verifyUserOffer);

export { router as OfferRoutes };