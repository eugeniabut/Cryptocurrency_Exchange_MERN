import React from 'react'
import "./header.css"
function Header() {
  return (
    <>
<nav class="nav">
    <div class="container">
        <div class="logo">
            <a href="#">YourLogo</a>
        </div>
        <div class="main_list" id="mainListDiv">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="login">login</a></li>
                <li><a href="#">live Trading</a></li>
                <li><a href="#">contact</a></li>
            </ul>
        </div>
        <div class="media_button">
            <button class="main_media_button" id="mediaButton">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
</nav>
    
<section class="home"></section>    </>
  )
}

export default Header
