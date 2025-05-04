/*const firstMongoURI =
  "mongodb+srv://ameerhamzamalik19:koinimilna123@userinfo.havihwx.mongodb.net/?retryWrites=true&w=majority&appName=userInfo";*/
import React from "react";
import connectDB from "./models/db.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // Must be explicit (no wildcard '*')
    credentials: true, // Required for cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json());
app.use(cookieParser());
connectDB();

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { fileURLToPath } from "url";

app.use("/users", userRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  "/productImages",
  express.static(path.join(__dirname, "./productImages"))
);
app.use("/products", productRoutes);

app.use("/payments", paymentRoutes);

app.use("/cart", cartRoutes);

app.use("/orders", orderRoutes);

app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log("Server running on http://localhost:5000");
});
