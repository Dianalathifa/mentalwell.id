import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../landing/Navbar.js';
import Footer from '../landing/Footer.js';

const ThirtyInterventions = () => {
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    fetchInterventions();
  }, []);

  const fetchInterventions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/intervensi');
      if (response.ok) {
        const data = await response.json();
        setInterventions(data);
      } else {
        console.error('Gagal memuat data intervensi');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h6 className="section-title mb-2 tfonts"><br />30 Days Writing Challenge<br /><br /></h6>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {interventions.map((intervention) => (
          <InterventionCard key={intervention.id_intervensi} intervention={intervention} />
        ))}
      <br/>
      <br/>
      </div>
      

      <Footer />

    </>
  );
};

const InterventionCard = ({ intervention }) => {
  return (
    <Card style={{ width: '20rem', margin: '20px' }}>
      <Card.Img variant="top" src={`http://localhost:8080/images/intervensi/${intervention.image_challenge}`} style={{ height: '600px' }} />
      <Card.Body>
        <Link to={`/formstress-user/${intervention.id_intervensi}`}>
          <Button variant="link">Tulis Sekarang</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ThirtyInterventions;
