import React, { useContext } from 'react'
import "./header.css"
import { NavLink } from 'react-router-dom'
import StorContext from '../context'
function Header() {
    const {authenticated,userData,logoutHandler}=useContext(StorContext)

    var mainListDiv = document.getElementById("mainListDiv"),
    mediaButton = document.getElementById("mediaButton");

console.log(authenticated);

  return (
    <><section className='home' >
        
<nav className="nav ">
    <div className="container ">
        <div className="logo">
            <a href="/"><img src='./Logo.jpg' alt='logo'/></a>
        </div>
        <div className="main_list" id="mainListDiv">
            <ul>

            
            
           <li><NavLink to="/" className="link" >Home</NavLink></li> 
           <li> <NavLink to="/about-us" className="link" >About Us</NavLink></li> 

           <li> <NavLink to="/trading-live" className="link" >live Trading</NavLink></li> 

           { !authenticated ? <li><NavLink to="/login" className="link" >login</NavLink></li>:<li><NavLink to="/" className="link" onClick={logoutHandler} >logout</NavLink></li>}
            {!authenticated ? <li><NavLink to="/register" className="link" >Register</NavLink></li>:<li><div><img src={userData.avatar} alt='profile'className='profile-pic' /><NavLink to="/profile"  className="link" >Profile</NavLink></div></li>}
           
            </ul>
        </div>
        <div className="media_button">
            <button className="main_media_button" 
            onClick={(e)=>{ 

    "use strict";
    
    mainListDiv.classList.toggle("show_list");
    mediaButton.classList.toggle("active");
    }} 
    id="mediaButton">
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
