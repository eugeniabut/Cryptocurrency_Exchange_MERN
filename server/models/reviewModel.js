import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  avatar:{
    type:String,
    required: true,

  },
  firstName:{
    type:String,
    required: true,


  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;

