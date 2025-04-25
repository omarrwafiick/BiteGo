import express from "express";   
import { addFoodItem, getFoodItems, getFoodAvailable, getFoodIn30Minute, getResturantById, getTopResturant, searchFood} from "../controllers/fooditems.controller";
import multer from "multer";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";
require('dotenv').config();
const router = express.Router(); 

router.use(ValidateSignatureMiddleWare);

const storage = multer.memoryStorage();

const uploadImage = multer({ storage: storage }).array('images',5);

router.use(RoleBasedAuthentication(String(process.env.VENDOR)));

router.post("/add-items", uploadImage, addFoodItem);

router.get("/", getFoodItems);  

router.use(RoleBasedAuthentication(String(process.env.USER)));

router.get("/:pincode", getFoodAvailable);

router.get("/top-resturants/:pincode", getTopResturant);

router.get("/availablein30min/:pincode", getFoodIn30Minute);

router.get("/search/:pincode", searchFood);

router.get("/resturant/:id", getResturantById);

export { router as FoodItemsRoute };