import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import Order from "../models/ordersModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Review from "../models/reviewModel.js";
import Rating from "../models/ratingModel.js";

const addProduct = async (req, res) => {
  try {
    let { title, price, quantity, description } = req.body;
    let logUser = req.cookies.username;
    let originalName = req.file.originalname;
    let ext = path.extname(originalName);
    let baseName = path.basename(originalName, ext);
    let uniqueFilename = baseName;
    let imagePath;
    let counter = 1;

    if (!logUser) {
      return res.status(400).json({ message: "unauthenticated" });
    }

    // Loop to find unique filename in DB
    while (true) {
      imagePath = `${uniqueFilename}${ext}`;
      const existing = await Product.findOne({ imageURL: imagePath });

      if (!existing) break;
      uniqueFilename = `${baseName}-${counter}`;
      counter++;
    }

    // Rename the file on disk
    const oldPath = req.file.path;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const newPath = path.join(
      __dirname,
      "../productImages",
      `${uniqueFilename}${ext}`
    );
    fs.renameSync(oldPath, newPath);

    const product = new Product({
      username: logUser,
      title,
      imageURL: `${uniqueFilename}${ext}`,
      price,
      quantity,
      description,
    });

    await product.save();
    return res.status(201).json({ message: "Product saved", product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Upload failed" });
  }
};

const dltProduct = async (req, res) => {
  try {
    const { title } = req.body;
    const logUser = req.cookies.username;

    if (!logUser || !title) {
      return res.status(400).json({ message: "Missing username or title" });
    }

    const imgurl = await Product.findOne({
      username: logUser,
      title: title,
    }).select("imageURL");
    console.log(imgurl);

    const result = await Product.deleteOne({
      username: logUser,
      title: title,
    });

    await Cart.deleteOne({
      username: logUser,
      product: title,
    });

    await Order.deleteOne({
      username: logUser,
      title: title,
    });

    // Check if file exists and delete
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const imagePath = path.join(__dirname, "../productImages", imgurl);
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error("Error deleting file:", err);
          else console.log("Image deleted:", imgurl);
        });
      } else {
        console.warn("Image file does not exist:", imagePath);
      }
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProducts = async (req, res) => {
  const logUser = req.cookies.username;

  try {
    const products = await Product.find({ username: logUser });

    if (products.length > 0) return res.status(200).json({ products });
    else return res.status(200).json({ message: 0 });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};

const getHomeProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ products });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};

const submitReviewRating = async (req, res) => {
  const { title, rate, review } = req.body;

  const logUser = req.cookies.username;

  try {
    const addReview = new Review({
      username: logUser,
      title: title,
      review: review,
    });
    await addReview.save();

    const addRating = new Rating({
      username: logUser,
      title: title,
      rating: rate,
    });

    await addRating.save();

    return res.status(200).json({ message: "Recorded" });
  } catch (error) {
    console.log(error);
  }
};

const getSearchProducts = async (req, res) => {
  const product = req.cookies.searchQuery;

  const get = await Product.find({ title: product });

  return res.status(200).json({ products: get });
};

export default {
  addProduct,
  dltProduct,
  getUserProducts,
  getHomeProducts,
  submitReviewRating,
  getSearchProducts,
};
