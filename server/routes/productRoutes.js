/* ----------------------Start from here-------------------- */

import express from "express";
import productController from "../controllers/productController.js";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const router = express.Router();

// Multer storage config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../productImages"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post(
  "/add-product",
  upload.single("productImage"),
  productController.addProduct
);

router.delete("/dlt-product", productController.dltProduct);

router.get("/get-profile-products", productController.getUserProducts);

router.get("/get-home-products", productController.getHomeProducts);

router.post("/submit-review-rating", productController.submitReviewRating);

router.get("/get-search-products", productController.getSearchProducts);

export default router;
