import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

import "./newsCard.css"
function NewsCard(props) {
    const {data}=props
    console.log(data);
  return (
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={`${data.urlToImage}`}
        alt="news"
        style={{hight:"20rem"}}
      />
      <Carousel.Caption>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <small>{data.author}</small>
        <span class="post-date"><i class="fa fa-clock-o"></i>{data.publishedAt}</span>
      </Carousel.Caption>
    </Carousel.Item>

  </Carousel>
);
  
   
  
}

export default NewsCard
