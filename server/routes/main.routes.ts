import express from "express";  
import multer from "multer";
import imageStorage from "../middlewares/imageStorage.middleware";
import { cancelOrder } from "../controllers/order.controller";
import { uploadAccountImage } from "../controllers/images.controller";

const router = express.Router();
 
const uploadImage = multer({ storage: imageStorage }).single("profilePicture");

router.patch("/upload-images/:type", uploadImage, uploadAccountImage);  
 
router.delete("/order/:id/:type", cancelOrder); 

export { router as MainRoutes };
