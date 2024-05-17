import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../landing/Navbar.js';
import CBT1 from '../../images/CBT/CBT1.png';
import CBT2 from '../../images/CBT/CBT2.png';
import CBT3 from '../../images/CBT/CBT3.png';
import Footer from '../../landing/Footer.js';

const CBT = () => {
  const CBT = [
    { id: 1, image: CBT1, text: "Section 1", link: "/cbt-pikiran" },
    { id: 2, image: CBT2, text: "Section 2", link: "/cbt-perasaan" },
    { id: 3, image: CBT3, text: "Section 3", link: "/cbt-percaya-diri" },
  ];

  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h6 className="section-title mb-2 tfonts"><br />Kelola Depresi dengan (Cognitive Behavior Therapy).<br /><br /></h6>
      </div>
      <div className="container">
        <div className="row">
          {CBT.map((CBT) => (
            <InterventionCard key={CBT.id} intervention={CBT} />
          ))}
        </div>
      <br/><br/><br/><br/>
      </div>
      

      <Footer />
    </>
  );
};

const InterventionCard = ({ intervention }) => {
  const { image, text, link } = intervention;
  return (
    <div className="col-md-3 mb-4" style={{marginLeft:"80px"}}>
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

export default CBT;
