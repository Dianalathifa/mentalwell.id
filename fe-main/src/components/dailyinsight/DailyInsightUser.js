import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import "./css/DailyInsightUser.css"; // Import file CSS untuk styling tambahan

const DailyInsightUser = () => {
  const [dailyInsights, setDailyInsights] = useState([]);
  

  useEffect(() => {
    const fetchDailyInsights = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/dailyinsight");
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
      <hr></hr>
        <Row xs={1} md={2} lg={3} className="g-4">
          {dailyInsights.map((dailyInsight) => (
            <Col key={dailyInsight.id_daily_insight}>
              <Link to={`/dailyinsight/${dailyInsight.id_daily_insight}`} className="daily-insight-card-link">
                <Card className="daily-insight-card" style={{ height: "100%" }}>
                  <Card.Img variant="top" src={`http://localhost:8080/images/daily_insight/${dailyInsight.image}`} style={{ objectFit: "cover", height: "50%" }} />
                  <Card.Body>
                    <Card.Title className="daily-insight-card-title">{dailyInsight.judul_content}</Card.Title>
                    <Card.Text className="daily-insight-card-content">
                      {dailyInsight.deskripsi.length > 100 ? dailyInsight.deskripsi.substring(0, 100) + "..." : dailyInsight.deskripsi}
                    </Card.Text>
                    <Link to={`/dailyinsight/${dailyInsight.id_daily_insight}`}>
                      <Link variant="primary">Baca Selengkapnya</Link>
                    </Link>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <hr></hr>
        <hr></hr>
      <Footer />
    </div>
  );
};

export default DailyInsightUser;
