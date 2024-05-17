import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Col, Row, Form, Button, Card, Table } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import donothing from '../../images/stressCoping/donothing.png';
import Footer from '../../landing/Footer.js';

const DoNothing = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = () => {
        axios.get('http://localhost:8080/video-stress')
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the videos!', error);
            });
    };

    return (
        <>
         <Navbar />
      <section className="section before-content" style={{ backgroundColor: "#25B7D3", color: "#141313", marginTop: "-10px", paddingTop: "100px", paddingBottom: "-140px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "50%", backgroundColor: "white", zIndex: 1 }}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
              <h6 className="subtitle" style={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>Do Nothing For 2 Minutes</h6>
            </div>
          </Col>
          <br /><br /><br />
          <div className="container text-center">
            <img src={donothing} style={{ width: "700px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} alt="tidur-sehat" />
          </div>
        </div>
      </section>

      <Container className="mt-5">
        <Col md={16} className="d-flex align-items-center justify-content">
          <div className="container text-center">
            <p style={{ fontSize: "19px", fontWeight: "bold", color: "#25B7D3" }}>
            "Beri diri Anda waktu istirahat selama 2 menit untuk tidak melakukan apa pun! Pilihlah video berdurasi dua menit di bawah ini untuk mendukung Anda selama istirahat ini. 
            Maksimalkan penggunaan waktu tersebut dan biarkan diri Anda benar-benar bersantai selama dua menit penuh. 
            Otak Anda akan sangat berterima kasih atas istirahat ini!"
            </p>
          </div>
        </Col>
        </Container>
        <br /><br /><br />
        
        <Container>
            <Row className="video-list">
                {videos.map(video => (
                    <Col key={video.id} md={4} className="video-container mb-3">
                        <h3 className="video-title" style={{ fontWeight: "bold", fontSize: "20px" }}><br />{video.judul}</h3><br />
                        <div className="video-player">
                            <iframe
                                title={video.judul}
                                width="100%"
                                height="215"
                                src={`https://www.youtube.com/embed/${getYouTubeVideoID(video.url)}`}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
        
        <Footer />
        </>
    );
};

// Fungsi untuk mendapatkan ID video YouTube dari URL
const getYouTubeVideoID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export default DoNothing;
