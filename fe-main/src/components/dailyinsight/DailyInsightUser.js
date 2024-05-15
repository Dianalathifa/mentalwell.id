import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import "./css/DailyInsightUser.css"; // Import file CSS untuk styling tambahan

const DailyInsightUser = () => {
  const [dailyInsights, setDailyInsights] = useState([]);

  useEffect(() => {
    const fetchDailyInsights = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/daily_insight");
        setDailyInsights(response.data);
      } catch (error) {
        console.error("Error fetching daily insights:", error);
      }
    };

    fetchDailyInsights();
  }, []);

  return (
    <div>
      <Navbar />
      <section id="psikolog-list" className="section before-content" style={{ backgroundColor: "#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-140px", paddingTop: "200px" }}>
        <Col md={16} className="d-flex align-items-center justify-content-center">
          <div className="container text-center">
            <h6 className="section-title mb-2 tfonts"><br></br>Daily Insight<br></br><br></br></h6>
          </div>
        </Col>
      </section>
      <br/>
      <Container>
        <Row className="justify-content-center">
          {dailyInsights.map((daily_insight) => (
            <Col key={daily_insight.id} md={4} className="my-3">
              <Link to={`/dailyinsight-detail-user/${daily_insight.id}`}>
                <Card className="daily-insight-card">
                  <Card.Img variant="top" src={`http://localhost:8080/images/daily_insight/${daily_insight.image}`} style={{ objectFit: "cover", height: "50%" }} />
                  <Card.Body>
                    <Card.Title className="daily-insight-card-title">{daily_insight.judul_content}</Card.Title>
                    <Card.Text className="daily-insight-card-content">
                      {daily_insight.deskripsi.length > 100 ? daily_insight.deskripsi.substring(0, 100) + "..." : daily_insight.deskripsi}
                    </Card.Text>
                    <Link to={`/dailyinsight-detail-user/${daily_insight.id}`} className="link-text">Baca Selengkapnya</Link>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default DailyInsightUser;
