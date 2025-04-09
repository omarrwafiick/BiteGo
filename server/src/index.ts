import express from "express";
import cookieParser from "cookie-parser";
import {AdminRoutes, VendorRoutes, UserRoutes, OrderRoute, FoodItemsRoute, CartRoutes} from '../routes/index.routes'; 
import { ConnectDB } from "../config/dbConnections.cofig";
import  rateLimiter from 'express-rate-limit'; 
import path from "path";
import { OfferRoutes } from "../routes/offers.route";
import { PaymentRoutes } from "../routes/payment.route";

const app = express(); 
require('dotenv').config();
const rateLimit = rateLimiter({
    windowMs:15 * 60 * 1000, 
    max: 50,
    message: { error: 'Too many requests, please try again later.' }
});

app.use(rateLimit);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('images/', express.static(path.join(__dirname, 'images'))) 

app.use(`${String(process.env.MAIN_URL)+String(process.env.ADMIN_URL)}`, AdminRoutes); 
app.use(`${String(process.env.MAIN_URL)+String(process.env.VENDOR_URL)}`, VendorRoutes); 
app.use(`${String(process.env.MAIN_URL)+String(process.env.USER_URL)}`, UserRoutes);
app.use(`${String(process.env.MAIN_URL)+String(process.env.FOOD_URL)}`, FoodItemsRoute);
app.use(`${String(process.env.MAIN_URL)+String(process.env.ORDER_URL)}`, OrderRoute);
app.use(`${String(process.env.MAIN_URL)+String(process.env.CART_URL)}`, CartRoutes);
app.use(`${String(process.env.MAIN_URL)+String(process.env.OFFER_URL)}`, OfferRoutes);
app.use(`${String(process.env.MAIN_URL)+String(process.env.PAYMENT_URL)}`, PaymentRoutes);

app.listen(process.env.PORT_NUMBER, async () => {
    await ConnectDB();
    console.log("application is running on port 3000");
});