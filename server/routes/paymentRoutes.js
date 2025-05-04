/* ------------------------START FROM HERE------------------- */

import express from "express";
import paymentController from "../controllers/paymentController.js";

const router = express.Router();

router.post("/add-details", paymentController.addDetails);

export default router;
