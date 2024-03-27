import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../landing/Footer";
import Header from "../landing/Header";
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
      <Header />
      <Container className="my-5">
        <div className="daily-insight-header">
          <h1 className="text-center mb-4 daily-insight-title">Daily Insight</h1>
        </div>
        <Row xs={1} md={2} lg={3} className="g-4">
          {dailyInsights.map((dailyInsight) => (
            <Col key={dailyInsight.id_dailyinsight}>
              <Link to={`/dailyinsight/${dailyInsight.id_dailyinsight}`} className="daily-insight-card-link">
                <Card className="daily-insight-card" style={{ height: "100%" }}>
                  <Card.Img variant="top" src={`http://localhost:8080/images/daily_insight/${dailyInsight.image}`} style={{ objectFit: "cover", height: "50%" }} />
                  <Card.Body>
                    <Card.Title className="daily-insight-card-title">{dailyInsight.judul_content}</Card.Title>
                    <Card.Text className="daily-insight-card-content">
                      {dailyInsight.deskripsi.length > 100 ? dailyInsight.deskripsi.substring(0, 100) + "..." : dailyInsight.deskripsi}
                    </Card.Text>
                    <Link to={`/dailyinsight/${dailyInsight.id_dailyinsight}`}>
                      <Link variant="primary">Baca Selengkapnya</Link>
                    </Link>
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
