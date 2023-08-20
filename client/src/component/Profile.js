import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import ProfilePhoto from "./images/profile-free.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import StorContext from "../context";
import axios from "axios";
import CreateAccount from "./CreateAccount";
import MyProfileForme from "./MyProfileForme";


function Profile() {
  const { avatar, profileData } = useContext(StorContext);
  console.log(`avatar`, avatar);

  const emailAddress = "info-cryptosspace@gmail.com";

  return (
    <main className="main">
      <div className="sidebar">
        <div className="link-list">
          <p className="info">CryptosSpace Support:</p>

          <p className="info-support">
            <FontAwesomeIcon icon={faPhone} /> 0800 0000 77
          </p>
          <p className="info-support">
            <FontAwesomeIcon icon={faPhoneAlt} /> order a call back{" "}
          </p>

          <a className="info-support" href={`mailto:${emailAddress}`}>
            <FontAwesomeIcon icon={faEnvelope} /> {emailAddress}
          </a>

          <NavLink to="/coins" className="link-name">
            coins
          </NavLink>
        </div>
      </div>
      <div className="">
        <div className="card-content">
          <div className="card-heading">
           <div className="card-heading-links">
              <NavLink to="/my-wallet" className="link-name">
                My Wallet
              </NavLink>
              <NavLink to="/trading-live" className="link-name">
                My live Trading
              </NavLink>
              <NavLink to="/home" className="link-name profile-logout">
              <i className="fas fa-times-circle"></i> 
              </NavLink>
            </div>
          </div>
         
          <MyProfileForme />

        </div>
      </div>
    </main>
  );
}
export default Profile;
