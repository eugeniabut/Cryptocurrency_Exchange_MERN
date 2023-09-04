import React, { useContext, useState } from "react";
import "./homePage.css";
import CryptosCart from "./CryptosCart";
import GetStated from "./GetStated";
import Carousel from "react-bootstrap/Carousel";
import PhonApp from "./PhonApp";
import { myStore } from "../myStore/dataStore.js";
import CryptosList from "./CryptosList";
import StorContext from "../context";
import axios from "axios";
import Reviews from "./Reviews";

function Home() {
  const { userName, reviewText, avatar, setReviewText,authenticated } =
    useContext(StorContext);

  const newsData = myStore((state) =>
    state.newsData.results ? state.newsData.results : []
  );
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    console.log(reviewText);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/review/review-create`,
        reviewText
      );
      if (response.status === 201) {
        console.log("Review submitted successfully");
        setReviewText("");
      } else {
        console.error("Error submitting review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  console.log(reviewText);
  return (
    <div className="home">
      <div>
        <GetStated />
      </div>

      <div>
        <nav style={{ color: "goldenrod" }}>
          {" "}
          <h2> Tody's News </h2>
        </nav>
        <Carousel className="carousel">
          {newsData.map((data, i) => (
            <Carousel.Item key={i} className="card-item  news-text">
              <a href={`${data.url}`}>
                {" "}
                <img
                  className="d-block w-30 image"
                  src={`${data.image_url}`}
                  alt="news"
                />
              </a>
              <Carousel.Caption>
                <div className="news-box">
                  <a className="link" target="_blank" href={`${data.article_url
}`}>
                    {" "}
                    <h3> Title : {data.title}</h3>
                  </a>
                  {/* <p>  {data.description}</p> */}
                  <small>Author : {data.author}</small>
                  <br />
                  <span className="post-date">
                    <i className="fa fa-clock-o"></i>
                    {data.publishedAt}
                  </span>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div>
        (<CryptosList />)
      </div>

      <div>
        {" "}
        {/* <PhonApp /> */}
      </div>
      <section className="review-read-write">
        <div className="review-read">
          <Reviews />
        </div>

        {authenticated?<div className="review-write">
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <label className="review-label" htmlFor="reviewText">
              Write a Review:
            </label>
            <textarea
              className="review-area"
              id="reviewText"
              value={reviewText.text}
              onChange={(e) =>
                setReviewText({
                  text: e.target.value,
                  avatar: avatar,
                  firstName: userName,
                })
              }
            />
            <button className="review-btn" type="submit">
              Submit
            </button>
          </form>
        </div>:""}
      </section>
    </div>
  );
}

export default Home;
