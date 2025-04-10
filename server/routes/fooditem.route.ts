import express from "express";   
import { addFoodItem, getFoodItems, getFoodAvailable, getFoodIn30Minute, getResturantById, getTopResturant, searchFood} from "../controllers/fooditems.controller";
import imageStorage from "../middlewares/imageStorage.middleware";
import multer from "multer";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";
import { RoleBasedAuthentication } from "../middlewares/RoleBasedAuth.middleware";

const router = express.Router(); 

const uploadImage = multer({ storage: imageStorage }).array('images',5);

router.use(ValidateSignatureMiddleWare);
 
router.use(RoleBasedAuthentication(String(process.env.VENDOR)));

router.post("/", uploadImage, addFoodItem);

router.get("/", getFoodItems);  

router.use(RoleBasedAuthentication(String(process.env.USER)));

router.get("/:pincode", getFoodAvailable);

router.get("/top-resturants/:pincode", getTopResturant);

router.get("/availablein30min/:pincode", getFoodIn30Minute);

router.get("/search/:pincode", searchFood);

router.get("/resturant/:id", getResturantById);

export { router as FoodItemsRoute };