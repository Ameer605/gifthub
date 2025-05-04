import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
});

const Rating = mongoose.model("rating", ratingSchema);

export default Rating;
