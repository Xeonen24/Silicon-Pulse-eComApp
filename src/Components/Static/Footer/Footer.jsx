import React from "react";
import "./Footer.css";

import fb from "../../../Images/fb.webp";
import x from "../../../Images/x.png";
import insta from "../../../Images/insta.avif";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="/">
          <div className="footer-logo">Silicon Pulse</div>
        </a>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/product">Products</a>
          <a href="/about">About Us</a>
        </div>
        <div className="footer-social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={fb} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={x} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={insta} />
          </a>
        </div>
      </div>
      <div className="footer-contact">
        <p>
          Contact us:{" "}
          <a href="mailto:info@siliconpulse.com">info@siliconpulse.com</a>
        </p>
        <p>&copy; 2023 Silicon Pulse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
