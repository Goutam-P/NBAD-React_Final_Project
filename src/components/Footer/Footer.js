// Footer.js
import React from 'react';
import '../../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <p className="footer-text">&copy; {new Date().getFullYear()} All rights reserved. GAUTAM</p>
    </footer>
  );
};

export default Footer;
