import Review from "../models/reviewModel.js";

export const createReview = async (req, res, next) => {
  try {
    const { text, avatar, firstName } = req.body; // Destructuring from req.body
console.log(req.body);
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: "Review text is required and cannot be empty." });
    }

    const review = new Review({
      avatar: avatar,
      firstName: firstName,
      text: text,
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
    const reviews = await Review.find().select('avatar firstName text createdAt');
    const formattedReviews = reviews.map(review => ({
      avatar: review.avatar,
      firstName: review.firstName,
      text: review.text,
      date: formatDate(review.createdAt),
    }));

    res.status(200).json(formattedReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// To format date in "YYYY/MM/DD" format:
function formatDate(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('en-US', options).replace(/\//g, '-');
}





