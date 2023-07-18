import React from 'react'
import "./header.css"
import { NavLink } from 'react-router-dom'
function Header() {
  return (
    <><section className='home' >
<nav class="nav ">
    <div class="container ">
        <div class="logo">
            <a href="/"><img src='./Logo.jpg' alt='logo'/></a>
        </div>
        <div class="main_list" id="mainListDiv">
            <ul>
           <li><NavLink to="/" className="link" >Home</NavLink></li> 
           <li> <NavLink to="/about-us" className="link" >About Us</NavLink></li> 
           <li> <NavLink to="/login" className="link" >login</NavLink></li>
           <li> <NavLink to="/register" className="link" >register</NavLink></li>
           <li> <NavLink to="/trading-live" className="link" >live Trading</NavLink></li> 
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
    
</section>    </>
  )
}

export default Header
