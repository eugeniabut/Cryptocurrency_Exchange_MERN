import Review from "../models/reviewModel.js";

export const createReview = async (req, res, next) => {
  try {
    const { reviewText } = req.body;  // Destructuring from req.body
    const review = new Review({
      review: reviewText,  // Using 'review' property name
    });

    const newReview = await review.save();

    res.status(201).json({ message: "Review submitted successfully" });  // Using HTTP status code 201 for created resource
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};