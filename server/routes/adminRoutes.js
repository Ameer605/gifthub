import express from "express";
import adminController from "../controllers/adminController.js";

const router = express.Router();

router.get("/pending-orders", adminController.pendingOrders);

router.get("/completed-orders", adminController.completedOrders);

router.get("/sellers", adminController.sellers);

router.get("/buyers", adminController.buyers);

router.get("/reviews", adminController.reviews);

router.get("/ratings", adminController.ratings);

export default router;
