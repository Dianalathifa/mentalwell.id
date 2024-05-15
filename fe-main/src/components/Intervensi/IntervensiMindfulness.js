import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../landing/Navbar.js';
import mindfulness1 from '../images/intervensi/mindfulness1.png';
import mindfulness2 from '../images/intervensi/mindfulness2.png';
import mindfulness3 from '../images/intervensi/mindfulness3.png';
import mindfulness4 from '../images/intervensi/mindfulness4.png';
import Footer from '../landing/Footer.js';

const Mindfulness = () => {
  const interventions = [
    { id: 1, image: mindfulness1, text: "Pengenalan MBSR (Mindfulness-Based Stress Reduction)", link: "/intro-mbsr" },
    { id: 2, image: mindfulness2, text: "Latihan Mindfulness", link: "/mindfulness-exercise" },
    { id: 3, image: mindfulness3, text: "Mindful Body Scan dan Mindful Breathing", link: "/body-scan-breathing" },
    { id: 4, image: mindfulness4, text: "Penerapan MBSR dalam Kehidupan Sehari-hari", link: "/mbsr-implementation" }
  ];

  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h6 className="section-title mb-2 tfonts"><br />Mindfulness-Based Stress Reduction<br /><br /></h6>
      </div>
      <div className="container">
        <div className="row">
          {interventions.map((intervention) => (
            <InterventionCard key={intervention.id} intervention={intervention} />
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

export default Mindfulness;
