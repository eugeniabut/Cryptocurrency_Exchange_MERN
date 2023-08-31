import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faSnapchat,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

export default function App() {
  return (
    <footer className=" footer-basic">
      <div className="social">
        <a  target="_blank" href="https://www.instagram.com/">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a target="_blank" href="https://www.snapchat.com/">
          <FontAwesomeIcon icon={faSnapchat} />
        </a>
        <a target="_blank" href="https://twitter.com/?lang=en">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a target="_blank" href="https://www.facebook.com/">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
      <div>
        <ul className="list-inline">
          <li>
            <NavLink to="/" className="list-inline-item">
              Home
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/trading-live" className="list-inline-item">
              Services
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/about-us" className="list-inline-item">
              About Us
            </NavLink>
          </li>
         
          
        </ul>
      </div>
     <div> <p className="copyright">Cryptos-Space © {new Date().getFullYear()}</p></div>
      <div className="footer-img"> <img src="./footer.jpg" alt="footer"/></div>
    </footer>
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
  );
}
