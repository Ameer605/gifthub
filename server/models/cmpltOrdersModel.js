import mongoose from "mongoose";

const cmpltSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const CmpltOrder = mongoose.model("completeOrder", cmpltSchema);

export default CmpltOrder;
