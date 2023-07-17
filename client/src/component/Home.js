import React from 'react'
import "./homePage.css"
import NewsCard from './NewsCard'
import ReactCardSlider from "react-card-slider-component";
import CryptosCart from './CryptosCart';
import GetStated from './GetStated';
import Carousel from 'react-bootstrap/Carousel';

function Home(props) {

  const {newsData,cryptosData}=props




   

  return (
<div className='home'>
  
<GetStated/>

<Carousel>
{ newsData.map((data)=><Carousel.Item className='card-item news-text'>
<img
      
        className="d-block w-30 image"
        src={`${data.urlToImage}`}
        alt="news"
       
      />
      <Carousel.Caption  style={{color:"black"}}>
       <a className='link' href={`${data.url}`} >  <h3>{data.title}</h3></a>
        <p>{data.description}</p>
        <small>{data.author}</small>
        <span class="post-date"><i class="fa fa-clock-o"></i>{data.publishedAt}</span>
      </Carousel.Caption>
    </Carousel.Item>)} 

  </Carousel>
{ cryptosData.map(data=><CryptosCart  data={data}/>)}


</div>

  )
}

export default Home
