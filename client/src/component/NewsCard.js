import React, { useContext } from 'react'
import Carousel from 'react-bootstrap/Carousel';

import "./newsCard.css"
import StorContext from '../context';
function NewsCard() {
	const{userData}=useContext(StorContext)
  return (
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={`${userData.urlToImage}`}
        alt="news"
        style={{hight:"20rem"}}
      />
      <Carousel.Caption>
        <h3>{userData.title}</h3>
        <p>{userData.description}</p>
        <small>{userData.author}</small>
        <span class="post-date"><i class="fa fa-clock-o"></i>{userData.publishedAt}</span>
      </Carousel.Caption>
    </Carousel.Item>

  </Carousel>
);
  
   
  
}

export default NewsCard
