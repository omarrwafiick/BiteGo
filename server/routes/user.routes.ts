import express from "express";  
import { uploadUserImage } from "../controllers/profileImage.controller";
const router = express.Router(); 
 
router.post("/uploadimage/:id",  uploadUserImage);

router.post("/login");

export { router as UserRoutes };