import express from "express";  
import multer from "multer"; 
import { cancelOrder } from "../controllers/order.controller";
import { getImageFromServer, uploadAccountImage } from "../controllers/images.controller";
import { ValidateSignatureMiddleWare } from "../middlewares/authenticate.middleware";

const router = express.Router();

router.use(ValidateSignatureMiddleWare); 
 
const storage = multer.memoryStorage(); 

const uploadImage = multer({ storage: storage }).array('images',5);

router.get("/:filename", getImageFromServer);  
 
router.patch("/upload-images/:type", uploadImage, uploadAccountImage);  
 
router.delete("/order/:id/:type", cancelOrder); 

export { router as MainRoutes };
