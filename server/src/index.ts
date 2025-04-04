import express from "express";
import cookieParser from "cookie-parser";
import {AdminRoutes, VendorRoutes} from '../routes/index.routes'; 
import { ConnectDB } from "../config/dbConnections.cofig";
import  rateLimiter from 'express-rate-limit'

const app = express(); 
const rateLimit = rateLimiter({
    windowMs:15 * 60 * 1000, 
    max: 50,
    message: { error: 'Too many requests, please try again later.' }
});

app.use(rateLimit);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config(); 


 
app.use(`${String(process.env.MAIN_URL)+String(process.env.ADMIN_URL)}`, AdminRoutes);
app.use(`${String(process.env.MAIN_URL)+String(process.env.VENDOR_URL)}`, VendorRoutes);

app.listen(process.env.PORT_NUMBER, async () => {
    await ConnectDB();
    console.log("application is running on port 3000");
});