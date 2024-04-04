import React from "react";
import "../style/Footer.css";
import Logo from "../images/logo.png";
import fb from "../images/facebook.png";
import twitter from "../images/twitter.png";
import insta from "../images/ig.png";
import tiktok from "../images/tiktok.png";

const Footer = () => {
  return (
    <div className="bg footer" style={{ backgroundColor: "#C4EAF4"}}>
      <div className="sb__footer section__padding">
        <div className="sb__footer-links">
          <div className="sb__footer-link-div" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={Logo} alt="logo" style={{ width: "40%", marginTop: "0px" }} />
            <h4 className="font-weight-bold" style={{ color: "black" }}>MENTALWELL</h4>
          </div>

          <div className="sb__footer-links_div">
            <h4 className="font-weight-bold" style={{ color: "black" }}>About Us</h4>
            <a href="/about-us"> 
              <p style={{ color: "black" }}>MentalWell adalah platform kesehatan mental 
              yang dirancang sebagai solusi inovatif dalam 
              meningkatkan kesehatan mental mahasiswa melalui 
              test dan pemahaman lebih dalam tentang kesejahteraan mental </p>
              <p style={{ color: "blue" }}>Selengkapnya</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4 className="font-weight-bold" style={{ color: "black" }}>Contact</h4>
            <a href="/about">
              <p style={{ color: "black" }}>MentalWell</p>
            </a>
            <a href="/career">
              <p style={{ color: "black" }}>mentalwell@gmail.com</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4 className="font-weight-bold" style={{ color: "black" }}>Check Our Social Media on</h4>
            <div className="socialmedia">
              <p>
                <img src={fb} alt="" />
              </p>
              <p>
                <img src={twitter} alt="" />
              </p>
              <p>
                <img src={insta} alt="" />
              </p>
              <p>
                <img src={tiktok} alt="" />
              </p>
            </div>
          </div>
        </div>
      </div>


      <hr></hr>

      <div className="sb__footer-below">
        <div className="sb__footer-copyright">
          <p style={{ color: "black" }}>
            @{new Date().getFullYear()} © Copyright - MentalWell | Platform
            Kesehatan Mental.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
