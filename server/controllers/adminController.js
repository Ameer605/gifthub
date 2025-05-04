import Order from "../models/ordersModel.js";
import Product from "../models/productModel.js";
import CmpltOrder from "../models/cmpltOrdersModel.js";
import User from "../models/userInfoModel.js";
import Review from "../models/reviewModel.js";
import Rating from "../models/ratingModel.js";

const pendingOrders = async (req, res) => {
  const logUser = req.cookies.username;
  try {
    const orders = await Order.find();
    if (!orders) return res.status(200).json({ message: "Nothing found" });
    const returnArray = [];
    for (const order of orders) {
      const seller = await Product.findOne({ title: order.title });
      returnArray.push({
        _id: seller._id,
        title: order.title,
        buyer: order.username,
        price: order.price,
        quantity: order.quantity,
        seller: seller.username,
      });
    }
    return res.status(200).json(returnArray);
  } catch (error) {
    console.log(error);
  }
};

const completedOrders = async (req, res) => {
  const logUser = req.cookies.username;
  try {
    const orders = await CmpltOrder.find();
    if (!orders) return res.status(200).json({ message: "Nothing found" });
    const returnArray = [];
    for (const order of orders) {
      const seller = await Product.findOne({ title: order.title });
      returnArray.push({
        _id: seller._id,
        title: order.title,
        buyer: order.username,
        price: order.price,
        quantity: order.quantity,
        seller: seller.username,
      });
    }
    return res.status(200).json(returnArray);
  } catch (error) {
    console.log(error);
  }
};

const sellers = async (req, res) => {
  try {
    const users = await User.find({ userType: "seller" });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const buyers = async (req, res) => {
  try {
    const users = await User.find({ userType: "buyer" });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const reviews = async (req, res) => {
  try {
    const review = await Review.find();
    return res.status(200).json(review);
  } catch (error) {
    console.log(error);
  }
};

const ratings = async (req, res) => {
  try {
    const rating = await Rating.find();
    return res.status(200).json(rating);
  } catch (error) {
    console.log(error);
  }
};

export default {
  pendingOrders,
  completedOrders,
  sellers,
  buyers,
  reviews,
  ratings,
};
