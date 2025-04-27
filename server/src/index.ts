import express from "express";
import cookieParser from "cookie-parser";
import {AdminRoutes, VendorRoutes, UserRoutes, OrderRoute, FoodItemsRoute, CartRoutes, MainRoutes, AuthRoutes} from '../routes/index.routes'; 
import { ConnectDB } from "../config/dbConnections.cofig";
import path from "path";
import { OfferRoutes } from "../routes/offers.route";
import { TransactionRoutes } from "../routes/transaction.route";
import { DeliveryRoutes } from "../routes/delivery.routes"; 
import helmet from "helmet";
import { rateLimiting } from "../utilities/rateLimit";
import cors from 'cors';
 
const app = express(); 
//environment variables 
require('dotenv').config();

//rate limiting
app.use(rateLimiting);
//parse json to an object
app.use(express.json());
//parse cookie to an object
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//image path
app.use('../assets/uploads', express.static(path.join(__dirname, '../assets/uploads')));
//sanitize request headers  
app.use(helmet());
//cors policy
app.use(cors());
//routes
app.use(`${String(process.env.MAIN_URL)}`, MainRoutes);
app.use(`${String(process.env.MAIN_URL)+String(process.env.AUTH_URL)}`, AuthRoutes); 
app.use(`${String(process.env.MAIN_URL)+String(process.env.ADMIN_URL)}`, AdminRoutes); 
app.use(`${String(process.env.MAIN_URL)+String(process.env.VENDOR_URL)}`, VendorRoutes); 
app.use(`${String(process.env.MAIN_URL)+String(process.env.USER_URL)}`, UserRoutes);
app.use(`${String(process.env.MAIN_URL)+String(process.env.FOOD_URL)}`, FoodItemsRoute);
app.use(`${String(process.env.MAIN_URL)+String(process.env.ORDER_URL)}`, OrderRoute);
app.use(`${String(process.env.MAIN_URL)+String(process.env.CART_URL)}`, CartRoutes);
app.use(`${String(process.env.MAIN_URL)+String(process.env.OFFER_URL)}`, OfferRoutes);
app.use(`${String(process.env.MAIN_URL)+String(process.env.TRANSACTION_URL)}`, TransactionRoutes);
app.use(`${String(process.env.MAIN_URL)+String(process.env.DELIVERY_URL)}`, DeliveryRoutes);

app.listen(process.env.PORT_NUMBER, async () => {
    await ConnectDB();
    console.log("application is running on port 3000");
});