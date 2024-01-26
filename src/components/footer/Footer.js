import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div style={{position: 'fixed', bottom: '10px', width: '100%', textAlign: 'center'}}>
         © {new Date().getFullYear()}, Made by
          <span> Aidana Turmetova</span>
    </div>
  );
};

export default Footer;
