import express from "express";  
import multer from "multer"; 
import { cancelOrder } from "../controllers/order.controller";
import { uploadAccountImage } from "../controllers/images.controller";

const router = express.Router();
 
const storage = multer.memoryStorage();

const uploadImage = multer({ storage: storage }).array('images',5);

router.patch("/upload-images/:type", uploadImage, uploadAccountImage);  
 
router.delete("/order/:id/:type", cancelOrder); 

export { router as MainRoutes };
