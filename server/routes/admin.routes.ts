import express, { Request, Response, NextFunction } from "express";
import { createAdmin } from '../controllers/admins.controller' 

const router = express.Router();
 
router.get("/",  );

router.get("/:id",  );

router.post("/", createAdmin );


export { router as AdminRoutes };

