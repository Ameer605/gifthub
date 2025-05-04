import express from "express";
import cartController from "../controllers/cartController.js";

const router = express.Router();

router.post("/add-to-cart", cartController.addToCart);

router.get("/get-cart-products", cartController.getCartProducts);

export default router;
