import express from "express";   
import { addFoodItem, getFoodItems, getFoodAvailable, getFoodIn30Minute, getResturantById, getTopResturant, searchFood, removeFoodItems } from "../controllers/fooditems.controller";
import multer from "multer";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
import { addFoodItemToOffer } from "../controllers/offer.controller";
require('dotenv').config();
const router = express.Router(); 

router.use(ValidateSignatureMiddleWare);

router.get("/", getFoodItems);  

const storage = multer.memoryStorage(); 

const uploadImage = multer({ storage: storage }).array('images',5);

router.post("/add-item", RoleBasedAuthentication(String(process.env.VENDOR)), uploadImage, addFoodItem);

router.get("/remove-item/:id", RoleBasedAuthentication(String(process.env.VENDOR)), removeFoodItems);

router.put("/add-item/:offerid/:itemid", RoleBasedAuthentication(String(process.env.VENDOR)), addFoodItemToOffer);

router.use(RoleBasedAuthentication(String(process.env.USER)));

router.get("/available/:pincode", getFoodAvailable);

router.get("/top-resturants/:pincode", getTopResturant);

router.get("/availablein30min/:pincode", getFoodIn30Minute);

router.get("/search/:pincode", searchFood);

router.get("/resturant/:id", getResturantById);


export { router as FoodItemsRoute };