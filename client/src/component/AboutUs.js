import React from 'react'
import "./aboutUs.css"
function AboutUs() {
  return (
    <div>
         <header class="showcase">
    <div class="content">
      <img src="./crypto-space.png" style={{height:50}} class="logo" alt="Traversy Media"/>
      <div class="title">
        Welcome To Cryptos-Space
      </div>
      <div >
      <p class="text" >Cryptos-space is the trading and investing platform that empowers you to grow your knowledge and wealth as part of a global community.

We all want our money to work harder. Some of us are beginners, some more experienced, but we all wish that we could do better. 

eToro was founded in 2007 with the vision of a world where everyone can trade and invest in a simple and transparent way. 

We believe there is power in shared knowledge. So we’ve created an investment community built around social collaboration and investor education. Our platform is designed to provide you with the tools you need to grow your knowledge and wealth. 

We can become more successful by investing together.  </p>    </div>
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

          {/* <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-facebook" aria-hidden="true"></a></li>
          <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-twitter" aria-hidden="true"></a></li>
          <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-google-plus" aria-hidden="true"></a></li>
          <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-linkedin" aria-hidden="true"></a></li> */}
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
        <li><a href="https://github.com/MerKhadraoui" class="fa fa-twitter" aria-hidden="true"></a></li>

        </ul>
      </div>
    </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="our-team">
        <div class="picture">
          <img class="img-fluid" src="https://picsum.photos/130/130?image=856"/>
        </div>
        <div class="team-content">
          <h3 class="name">Sixtus</h3>
          <h4 class="title">Web Developer</h4>
        </div>
        <ul class="social">
        <li><a href="https://github.com/MerKhadraoui" class="fa fa-twitter" aria-hidden="true"></a></li>

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
        <li><a href="https://github.com/MerKhadraoui" class="fa fa-twitter" aria-hidden="true"></a></li>

        </ul>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}



export default AboutUs

