import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p style={textStyle}>© 2023 Your Company. All rights reserved.</p>
        <p style={textStyle}>Contact: example@example.com</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#f0f0f0',
  padding: '20px',
  marginTop: '50px',
  textAlign: 'center'
};

const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto'
};

const textStyle = {
  color: '#888',
  fontSize: '14px',
  margin: '5px'
};

export default Footer;