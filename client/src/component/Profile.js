import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import ProfilePhoto from "./images/profile-free.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import StorContext from "../context";
import axios from "axios";
import CreateAccount from "./CreateAccount";
import MyProfileForme from "./MyProfileForme";
function Profile() {
  const { profileData} = useContext(StorContext);
  const emailAddress = "info-cryptosspace@gmail.com"

  return (
    <main className="main">
      <div className="sidebar">
        <div className="link-list">
        <p className="info">
            CryptosSpace Support:
         
          </p> 
          
           
           <p className="info-support">Call us: 0800 0000 77</p> 
           <p className="info-support">Order a call</p> 
          <a className="info-support" href={`mailto:${emailAddress}`}>Write us: {emailAddress}</a>

          <NavLink to="/home" className="link-name">
            Home
          </NavLink>
          <NavLink to="/my-wallet" className="link-name">
            My Wallet{" "}
          </NavLink>
          <NavLink to="/coins" className="link-name">
          coins 
          </NavLink>
        </div>
      </div>
      <div className="">
        <div className="card-content">
          <div className="card-heading">
            <div className="photo">
              <img src={profileData.avatar} alt="avatar" />
            </div>
            <div className="card-heading-photo-form">
          
            </div>

            <div className="card-heading-links">
              <NavLink to="/my-wallet" className=" link-name">
                My Wallet{" "}
              </NavLink>
              <NavLink to="/trading-live" className=" link-name">
                live Trading
              </NavLink>
            </div>
          </div>
         <MyProfileForme/>
        </div>
      </div>
    </main>
  );
}
export default Profile;
