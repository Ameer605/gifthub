import express from "express";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.post("/checkout", orderController.checkout);

router.get("/get-order-products", orderController.getOrderProducts);

router.post("/complete-order", orderController.completeOrder);

router.get("/get-completed-products", orderController.getCmpltOrders);

export default router;
