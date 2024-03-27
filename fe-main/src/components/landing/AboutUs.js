import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "../landing/Footer";
import Header from "../landing/Header";

const AboutUs = () => {
  const aboutUsContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.";

  return (
    <div>
      <Header />
      <Container className="my-5">
        <div className="about-us-header">
          <h1 className="text-center mb-4 about-us-title">About Us</h1>
        </div>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="about-us-card">
              <Card.Body>
                <Card.Text>{aboutUsContent}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default AboutUs;
