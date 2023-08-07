import React, { useContext } from 'react'
import "./homePage.css"
import CryptosCart from './CryptosCart';
import GetStated from './GetStated';
import Carousel from 'react-bootstrap/Carousel';
import PhonApp from './PhonApp';
import { myStore } from '../myStore/dataStore.js';
import CryptosList from './CryptosList';
import StorContext from '../context';

function Home() {
  const{userData}=useContext(StorContext)
  const newsData=myStore((state)=>state.newsData.articles?state.newsData.articles:[])
  return (
<div className='home'>
  
<div><GetStated/></div>



<div>
        <nav style={{color:"goldenrod"}}> <h2> Tody's News </h2></nav>
  <Carousel className='carousel'>
{ newsData.map((data,i)=>< Carousel.Item key={i} className='card-item  news-text'>
<a href={`${data.url}`} > <img
      
        className="d-block w-30 image"
        src={`${data.urlToImage}`}
        alt="news"
       
      /></a>
      <Carousel.Caption >
      <div  className='news-box'>
      <a className='link' href={`${data.url}`} >  <h3> Title : {data.title}</h3></a>
        {/* <p>  {data.description}</p> */}
        <small>Author : {data.author}</small><br/>
        <span className="post-date"><i className="fa fa-clock-o"></i>{data.publishedAt}</span>
      </div>
      </Carousel.Caption>
    </Carousel.Item>)} 
  </Carousel></div>
  {/* <div>
  <CryptosCart /></div> */}
<div>(<CryptosList/>)</div>
<div>
<PhonApp/></div>



</div>
  )
}

export default Home
