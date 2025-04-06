import express from "express";   

const router = express.Router(); 
 
// router.post("", createOrder);  // Place a new order
// router.get("/:id", getOrderDetails);  // Get specific order details
// router.get("", getUserOrders);  // Get orders placed by the user
// router.patch("/:id", updateOrderStatus);  // Update order status (cancel, shipped, etc.)
// router.delete("/:id", cancelOrder);  // Cancel an order

// // Payment & Checkout Routes
// router.post("/:id/payment", processPayment);  // Process payment for an order
// router.post("/:id/checkout", finalizeOrder);  // Finalize the order and start fulfillment

// // Order History
// router.get("/history", getOrderHistory);  // Get the user's order history

export { router as OrderRoute };