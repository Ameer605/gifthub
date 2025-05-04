/* ------------------------START FROM HERE------------------- */

import express from "express";
import userController from "../controllers/userController.js";
//import homeProducts from "../controllers/homeProducts.js";

const router = express.Router();

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post("/check-details", userController.checkDetails);

router.get("/check-type", userController.checkType);

router.get("/profile-details", userController.profileDetails);

router.post("/logout", userController.logout);

router.post("/change-password", userController.changePassword);

//router.post("/home-products", cors(), authCheckoutMiddleware, homeProducts);

export default router;
