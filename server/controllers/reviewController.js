import Review from "../models/reviewModel.js";

export const createReview = async (req, res, next) => {
  try {
    const { reviewText } = req.body; // Destructuring from req.body

    if (!reviewText || reviewText.trim() === '') {
      return res.status(400).json({ message: "Review text is required and cannot be empty." });
    }

    const review = new Review({
      reviewText: reviewText, // Use 'reviewText' property name instead of 'review'
    });

    const newReview = await review.save();

    res.status(201).json({ message: "Review submitted successfully", review: newReview });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().select('reviewText');
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





