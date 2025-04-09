import express, { Request, Response, NextFunction } from "express";
import { createAdmin } from '../controllers/admins.controller' 
import { login } from "../controllers/auth.controller";

const router = express.Router();
 
 
router.post("/login", login);  // Admin login
//createadmin
// router.get("/users", getUsers);  // List all users
// router.get("/user/:id", getUserDetails);  // Get specific user
// router.patch("/user/:id", updateUser);  // Update user info
// router.delete("/user/:id", deleteUser);  // Delete user

// router.get("/products", getProducts);  // List all products
// router.get("/product/:id", getProductDetails);  // Get specific product
// router.post("/product", createProduct);  // Add new product
// router.patch("/product/:id", updateProduct);  // Update product
// router.delete("/product/:id", deleteProduct);  // Delete product

// router.get("/orders", getOrders);  // List all orders
// router.get("/order/:id", getOrderDetails);  // Get order details
// router.patch("/order/:id", updateOrderStatus);  // Update order status
// router.delete("/order/:id", cancelOrder);  // Cancel order


export { router as AdminRoutes };

