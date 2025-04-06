import express from "express";   
import { addFoodItem, getFoodItems, getFoodAvailable, getFoodIn30Minute, getResturantById, getTopResturant, searchFood} from "../controllers/fooditems.controller";
import imageStorage from "../middlewares/imageStorage.middleware";
import multer from "multer";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";

const router = express.Router(); 

router.use(ValidateSignatureMiddleWare);

const uploadImage = multer({ storage: imageStorage }).array('images',10);

router.post("/", uploadImage, addFoodItem);

router.patch("/", uploadImage);

router.get("/", getFoodItems);  

router.get("/:pincode", getFoodAvailable);

router.get("/top-resturants/:pincode", getTopResturant);

router.get("/availablein30min/:pincode", getFoodIn30Minute);

router.get("/search/:pincode", searchFood);

router.get("/resturant/:id", getResturantById);

export { router as FoodItemsRoute };