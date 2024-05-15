import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../landing/Navbar.js';
import terapi1 from '../images/intervensi/terapi1.png';
import terapi2 from '../images/intervensi/terapi2.png';
import terapi3 from '../images/intervensi/terapi3.png';
import terapi4 from '../images/intervensi/terapi4.png';
import terapi5 from '../images/intervensi/terapi5.png';
import Footer from '../landing/Footer.js';

const Terapi = () => {
  const terapi = [
    { id: 1, image: terapi1, text: "Jadwal Tidur Sehat", link: "/jadwal-tidur" },
    { id: 2, image: terapi2, text: "Jadwal Olahraga Teratur", link: "/jadwal-olahraga" },
    { id: 3, image: terapi3, text: "Tujuan yang Ingin Dicapai", link: "/jadwal-tujuan" },
    { id: 4, image: terapi4, text: "Jadwal Kegiatan Menyenangkan", link: "/jadwal-kegiatan" },
    { id: 5, image: terapi5, text: "Pola Makan Sehat", link: "/pola-makan" }
  ];

  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h6 className="section-title mb-2 tfonts"><br />Activity Therapy<br /><br /></h6>
      </div>
      <div className="container">
        <div className="row">
          {terapi.map((terapi) => (
            <InterventionCard key={terapi.id} intervention={terapi} />
          ))}
        </div>
      <br/>
      <br/>
      </div>
      

      <Footer />
    </>
  );
};

const InterventionCard = ({ intervention }) => {
  const { image, text, link } = intervention;
  return (
    <div className="col-md-3 mb-3">
      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={image} style={{ height: '600px' }} />
        <Card.Body>
          <Link to={link} className="stretched-link"></Link>
          <Card.Text className="text-center" style={{ height: '50px' }}>{text}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Terapi;
