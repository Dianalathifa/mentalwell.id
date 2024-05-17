import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Col, Form, Button, Card, Table } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import grateful from '../../images/stressCoping/grateful.png';
import Footer from '../../landing/Footer.js';

const GratefulPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [inputs, setInputs] = useState({
    id_partisipan: localStorage.getItem('partisipan_id'),
    tanggal: new Date().toISOString().slice(0, 10),
    hal_disyukuri: ['', '', '', '', '']
  });
  const [gratefulList, setGratefulList] = useState([]);

  useEffect(() => {
    fetchGratefulList();
  }, []);

  const fetchGratefulList = async () => {
    const partisipanId = localStorage.getItem("partisipan_id");
    try {
      const response = await axios.get(`http://localhost:8080/grateful/${partisipanId}`);
      setGratefulList(response.data);
    } catch (error) {
      console.error('Error fetching grateful list:', error);
    }
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs.hal_disyukuri];
    newInputs[index] = value;
    setInputs({ ...inputs, hal_disyukuri: newInputs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/grateful', inputs);
      fetchGratefulList(); // Refresh the list after adding new data
      setInputs({
        id_partisipan: localStorage.getItem('partisipan_id'),
        tanggal: new Date().toISOString().slice(0, 10),
        hal_disyukuri: ['', '', '', '', '']
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="section before-content" style={{ backgroundColor: "#25B7D3", color: "#141313", marginTop: "-10px", paddingTop: "100px", paddingBottom: "-140px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "50%", backgroundColor: "white", zIndex: 1 }}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
              <h6 className="subtitle" style={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>Grateful !</h6>
            </div>
          </Col>
          <br /><br /><br />
          <div className="container text-center">
            <img src={grateful} style={{ width: "700px", height: "auto", width: "500px", height: "300px" }} alt="grateful" />
          </div>
        </div>
      </section>

      <Container className="mt-5">
        <Col md={16} className="d-flex align-items-center justify-content">
          <div className="container text-center">
            <p style={{ fontSize: "19px", fontWeight: "bold", color: "#25B7D3" }}>
            "Yuk, tuliskan 5 hal yang kamu syukuri hari ini! Menghargai hal-hal kecil dalam hidup bisa memberikan dampak besar pada kesejahteraan kita. 
            Dengan mengalokasikan waktu sejenak untuk merenungkan hal-hal yang kita syukuri, kita dapat mengubah perspektif kita menjadi lebih positif dan bersyukur. 
            Mari mulai dengan mengakui berkat-berkat kecil yang sering terlewatkan dalam kehidupan sehari-hari. Dari momen kecil hingga pencapaian besar, 
            setiap hal memiliki nilai tersendiri dalam hidup kita. 
            Jadi, ayo tuliskan 5 hal yang membuatmu bersyukur hari ini dan rasakan betapa berlimpahnya nikmat yang telah kita terima!"
            </p>
          </div>
        </Col>
        <br /><br /><br />
        
        <Col>
          
              <Card.Title className="container text-center" style={{ fontSize: "30px", fontWeight: "bold" }}>
                {showForm ? 'Tambah Hal yang Disyukuri' : 'Klik tombol di bawah untuk menambah hal yang disyukuri'}
              </Card.Title> <br/>
              {showForm ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formTanggal">
                    <Form.Label>Tanggal</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggal"
                      value={inputs.tanggal}
                      onChange={(e) => setInputs({ ...inputs, tanggal: e.target.value })}
                    /><br />
                  </Form.Group>
                  {inputs.hal_disyukuri.map((hal, index) => (
                    <Form.Group key={index} controlId={`formHal${index}`}>
                      <Form.Label>Hal yang Disyukuri {index + 1}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={`Masukkan hal yang disyukuri ${index + 1}`}
                        value={hal}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                      /><br />
                    </Form.Group>
                  ))}
                  <Button variant="light" type="submit" style={{ backgroundColor: "#25B7D3", color: "white", fontWeight: "bold" }}>
                    Submit
                  </Button>
                </Form>
              ) : (
                <Button variant="light" onClick={() => setShowForm(true)} style={{ width:"150px",height:"50px",fontSize:"21px",marginLeft:"1130px",backgroundColor: "#25B7D3", color: "white", fontWeight: "bold" }}>
                  + Add New
                </Button>
              )}<br/>
           
        </Col>
        
        <br/>
        <Col>
          <Card className="container text-center" style={{ borderRadius: "40px", fontWeight: "bold", fontSize: "25px", height: "500px", backgroundColor: "#25B7D329", color: "#25B7D3" }}>
            <Card.Body>
              <br />
              <Card.Title style={{ fontSize: "30px", fontWeight: "bold" }}>Daftar Hal yang Disyukuri</Card.Title><br /><br />
              {gratefulList.length === 0 ? (
                <p>Belum ada catatan hal yang disyukuri.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Tanggal</th>
                      <th>Hal yang Disyukuri</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gratefulList.map((item, index) => (
                      <tr key={item.id_grateful}>
                        <td>{index + 1}</td>
                        <td>{item.tanggal}</td>
                        <td>
                          <ul>
                            {item.hal_disyukuri.split(',').map((hal, idx) => (
                              <li key={idx}>{hal.trim()}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
        
      </Container>
      <br /><br /><br /><br />
      <Footer />
    </>
  );
};

export default GratefulPage;
