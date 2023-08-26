import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">Silicon Pulse</div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div className="footer-social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/images/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/images/twitter-icon.png" alt="Twitter" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/images/instagram-icon.png" alt="Instagram" />
          </a>
        </div>
      </div>
      <div className="footer-contact">
        <p>Contact us: <a href="mailto:info@siliconpulse.com">info@siliconpulse.com</a></p>
        <p>&copy; 2023 Silicon Pulse. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
