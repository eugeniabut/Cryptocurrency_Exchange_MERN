import React from 'react'
import "./homePage.css"
import CryptosCart from './CryptosCart';
import GetStated from './GetStated';
import Carousel from 'react-bootstrap/Carousel';
import PhonApp from './PhonApp';

function Home(props) {

  const {newsData,cryptosData}=props

  return (
<div className='home'>
  
<div><GetStated/></div>

<div><Carousel>
{ newsData.map((data)=><Carousel.Item className='card-item  news-text'>
<img
      
        className="d-block w-30 image"
        src={`${data.urlToImage}`}
        alt="news"
       
      />
      <Carousel.Caption >
      <div  className='news-box'>
        <nav> <h2> Tody's News </h2></nav>
      <a className='link' href={`${data.url}`} >  <h3> Title : {data.title}</h3></a>
        <p>  {data.description}</p>
        <small>Author : {data.author}</small><br/>
        <span class="post-date"><i class="fa fa-clock-o"></i>{data.publishedAt}</span>
      </div>
      </Carousel.Caption>
    </Carousel.Item>)} 
  </Carousel></div>
  <div>
  <CryptosCart /></div>
{/* { cryptosData.map(data=><CryptosCart  data={data}/>)}</div> */}
<div>
<PhonApp/></div>



</div>
  )
}

export default Home
