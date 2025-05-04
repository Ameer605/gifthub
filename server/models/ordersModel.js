import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

orderSchema.index({ username: 1, title: 1 }, { unique: true });

const Order = mongoose.model("Orders", orderSchema);

export default Order;
