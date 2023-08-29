import React, { useState, useEffect } from "react";
import "./Reviews.css";
import axios from "axios";
import { useContext } from "react";
import StorContext from "../context";

function Reviews() {
  const { reviewText, avatar, userData } = useContext(StorContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, [reviewText]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_URL}/review/all-reviews`
      );
      if (response.status === 200) {
        setReviews(response.data);
      } else {
        console.error("Error fetching reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleLikeDislike = (reviewId, action) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) => {
        if (review._id === reviewId) {
          const newLikes = review.likes || 0;
          const newDislikes = review.dislikes || 0;

          if (action === "like") {
            return { ...review, likes: newLikes + 1 };
          } else if (action === "dislike") {
            return { ...review, dislikes: newDislikes + 1 };
          }
        }
        return review;
      })
    );
  };

  const reversedReviews = [...reviews].reverse();
console.log(reviews );
  return (
    <>
      <h2 className="review-heading">Reviews</h2>
      <div className="reviews">
        {reversedReviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div id="testimonial-slider" class="owl-carousel">
                {reversedReviews.map((review) => (
                  <div class="testimonial">
                    <div class="pic"> 
                      <img src={review.avatar} alt="avatar" />
                    </div>
                    <p class="description">{review.text}</p>
                    <h4 class="title">{review.firstName}</h4>
                    <small class="post">{review.date}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
     
    </>
  );
}

export default Reviews;
