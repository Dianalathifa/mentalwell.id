import React from "react";
import "../style/Footer.css";
import Logo from "../images/logo.png";
import fb from "../images/facebook.png";
import twitter from "../images/twitter.png";
import insta from "../images/ig.png";
import tiktok from "../images/tiktok.png";

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: "#E3F7FE", paddingTop: "30px", paddingBottom: "30px", maxWidth: "1800px" }}>
      <div className="container">
        <div className="row" style={{ marginLeft: "70px" }}>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <img src={Logo} alt="logo" className="img-fluid mb-3" style={{ maxWidth: "90px", marginLeft: "70px" }} />
            <p className="text-muted" style={{ fontSize: "12px" }}>MENTALWELL adalah platform kesehatan mental yang dirancang sebagai solusi inovatif dalam meningkatkan kesehatan mental mahasiswa.</p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h4 className="mb-4" style={{color:"black", marginLeft: "65px"}}>Tentang Kami</h4>
            <p className="text-muted" style={{ fontSize: "12px", marginLeft: "70px" }}>MentalWell menyediakan berbagai layanan untuk membantu meningkatkan kesehatan mental melalui tes dan pemahaman lebih dalam.</p>
            <a href="/about-us" className="text-decoration-none text-muted" style={{ fontSize: "12px", marginLeft: "70px" }}>Baca Selengkapnya <i className="bi bi-arrow-right"></i></a>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h4 className=" mb-4" style={{color:"black", marginLeft: "65px"}}>Hubungi Kami</h4>
            <ul className="list-unstyled" style={{ marginLeft: "70px" }}>
              <li><a href="/about" className="text-decoration-none text-muted" style={{ fontSize: "12px" }}>MentalWell</a></li>
              <li><a href="/career" className="text-decoration-none text-muted" style={{ fontSize: "12px" }}>mentalwell@gmail.com</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h4 className=" mb-4" style={{color:"black", marginLeft: "5px"}}>Temukan Kami di Sosial Media</h4>
            <div className="social-icons">
              <a href="#!"><img src={fb} alt="Facebook" className="img-fluid mr-3" style={{ maxWidth: "30px" }} /></a>
              <a href="#!"><img src={twitter} alt="Twitter" className="img-fluid mr-3" style={{ maxWidth: "30px" }} /></a>
              <a href="#!"><img src={insta} alt="Instagram" className="img-fluid mr-3" style={{ maxWidth: "30px" }} /></a>
              <a href="#!"><img src={tiktok} alt="TikTok" className="img-fluid" style={{ maxWidth: "30px" }} /></a>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4" style={{ borderTop: "2px solid #ccc", width: "95%", margin: "0 auto" }} />

      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="text-muted mb-0" style={{ fontSize: "12px" }}>&copy; {new Date().getFullYear()} MentalWell. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
