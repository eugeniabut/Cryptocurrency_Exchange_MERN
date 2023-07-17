import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

import "./newsCard.css"
function NewsCard(props) {
    const {data}=props
    console.log(data);
  return (

    // <div class="container-fluid">
    // {/* <div class="row"> */}
    //   {/* <div class="col-md-12"> */}
    //     <div id="news-slider" class="owl-carousel">
    //       <div class="post-slide">
    //         <div class="post-img">
    //           <img src={`${data.urlToImage}`} alt="image"/>
    //           <a href={`${data.url}`} class="over-layer"><i class="fa fa-link"></i></a>
    //         </div>
    //         <div class="post-content">
    //           <h3 class="post-title">
    //             <a href={`${data.url}`} >{data.title}</a>
    //           </h3>
    //           <p class="post-description">{data.description}</p>
    //           <small>{data.author}</small>
    //           <span class="post-date"><i class="fa fa-clock-o"></i>{data.publishedAt}</span>
    //           {/* <a href="#" class="read-more">read more</a> */}
    //         </div>
    //       </div>
    //       {/* </div> */}
    //     {/* </div> */}
    //   </div>
    // </div>
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
