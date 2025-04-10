import express from "express";  
import multer from "multer";
import imageStorage from "../middlewares/imageStorage.middleware";
import { cancelOrder } from "../controllers/order.controller";

const router = express.Router();
 
const uploadImage = multer({ storage: imageStorage }).array('images',5);

router.patch("/upload-images", uploadImage); 

router.delete("/order/:id", cancelOrder); 

export { router as MainRoutes };
