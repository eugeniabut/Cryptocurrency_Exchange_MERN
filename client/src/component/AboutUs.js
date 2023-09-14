import React from 'react'
import "./aboutUs.css"
function AboutUs() {
  return (
    <div className='about-us'>
         <header class="showcase">
    <div class="content">
      <img src="./crypto-space.png" style={{height:50}} class="logo" alt="Traversy Media"/>
      <div class="title">
        Welcome To Cryptos-Space
      </div>
      <div >
      <p class="text" >  
                    We believe that in a decade the financial system of the internet — that is, commerce that happens on the internet — will be the largest financial system in the world. And it will be powered by crypto.
                    "SEMM-DV-Cryptos_Space" enabled anyone to not only examine transactions and study the blockchain, but it is also an API that enabled companies to build on Bitcoin. We also have provided the most popular and widely used crypto wallet that enables anyone anywhere to control their own money.

               </p>    </div>
    </div>
  </header>
  <div class="container">
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="our-team">
        <div class="picture">
          <img class="img-fluid" style={{  height:"100%"}} src="./miya.jpeg"/>
        </div>
        <div class="team-content">
          <h3 class="name">Meriem Khadraoui</h3>
          <h4 class="title">Web Developer</h4>
        </div>
        <ul class="social">
        <li><a href="https://github.com/MerKhadraoui"  class="fa fa-twitter" aria-hidden="true"></a></li>

         
        </ul>
      </div>
    </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="our-team">
        <div class="picture">
          <img class="img-fluid"  style={{  height:"100%"}}src="./0.jpg"/>
        </div>
        <div class="team-content">
          <h3 class="name">Eugenia Butkevich</h3>
          <h4 class="title">Web Developer</h4>
        </div>
        <ul class="social">
        <li><a href="https://github.com/eugeniabut" class="fa fa-twitter" aria-hidden="true"></a></li>

        </ul>
      </div>
    </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="our-team">
        <div class="picture">
          <img class="img-fluid" src="./profilepic.png"/>
        </div>
        <div class="team-content">
          <h3 class="name">Sixtus Adelehin</h3>
          <h4 class="title">Web Developer</h4>
        </div>
        <ul class="social">
        <li><a href="https://github.com/sixtusdci" class="fa fa-twitter" aria-hidden="true"></a></li>

        </ul>
      </div>
    </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="our-team">
        <div class="picture">
          <img class="img-fluid" style={{  height:"100%"}} src="./Foto2.jpeg"/>
        </div>
        <div class="team-content">
          <h3 class="name">Marina Tkachuk</h3>
          <h4 class="title">Web Developer</h4>
        </div>
        <ul class="social">
        <li><a href="https://github.com/maryna7777" class="fa fa-twitter" aria-hidden="true"></a></li>

        </ul>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}



export default AboutUs

