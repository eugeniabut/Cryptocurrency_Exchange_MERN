import React, { useState, useEffect } from 'react';
import './Reviews.css';
import axios from "axios"
import { useContext } from 'react';
import StorContext from '../context';

function Reviews() {
  const {reviewText}=useContext(StorContext)
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, [reviewText]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BE_URL}/review/all-reviews`);
      if (response.status === 200) {
        setReviews(response.data);
      } else {
        console.error('Error fetching reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleLikeDislike = (reviewId, action) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) => {
        if (review._id === reviewId) {
          const newLikes = review.likes || 0; // Initialize likes to 0 if undefined
          const newDislikes = review.dislikes || 0; // Initialize dislikes to 0 if undefined
  
          if (action === 'like') {
            return { ...review, likes: newLikes + 1 };
          } else if (action === 'dislike') {
            return { ...review, dislikes: newDislikes + 1 };
          }
        }
        return review;
      })
    );
  };
  
  const reversedReviews = [...reviews].reverse();

  return (
    <>
     <h2 className='review-heading'>Reviews</h2>
    <div className="reviews">
     
      {reversedReviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul>
          {reversedReviews.map((review) => (
            <li key={review._id}>
              
                <div className="review-content">
                  <p className="review-text">{review.reviewText} </p>
                </div>
                <div className="review-actions">
                  <button className="like" onClick={() => handleLikeDislike(review._id, 'like')}>
                    <i className="fas fa-thumbs-up"></i>
                    <span className="like-count">{review.likes}</span>
                  </button>
                  <button className="dislike" onClick={() => handleLikeDislike(review._id, 'dislike')}>
                    <i className="fas fa-thumbs-down"></i>
                    <span className="dislike-count">{review.dislikes}</span>
                  </button>
                </div>
           
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}
export default Reviews