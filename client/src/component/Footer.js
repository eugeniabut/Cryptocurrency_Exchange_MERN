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
      <div class="social">
        <a href="#">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faSnapchat} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
      <div>
        <ul class="list-inline">
          <li>
            <NavLink to="/" className="list-inline-item">
              Home
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/services" className="list-inline-item">
              Services
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/about-us" className="list-inline-item">
              About Us
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/Terms" className="list-inline-item">
              Terms
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/Privacy-Policy" className="list-inline-item">
              Privacy Policy
            </NavLink>
          </li>
        </ul>
      </div>
      <p class="copyright">Company Name © 2018</p>
    </footer>
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
  );
}
