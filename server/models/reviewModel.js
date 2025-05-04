import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  review: {
    type: String,
    require: true,
  },
});

const Review = mongoose.model("review", reviewSchema);

export default Review;
