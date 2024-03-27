import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import illustrasi from "./images/illustrasi-1.png";
import Footer from "./landing/Footer.js";
import Header from "./landing/Header.js";
import "./style/Home.css";

const FoodCard = ({ image, foodName }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <div className="card-image-container">
        <Card.Img
          variant="top"
          src={`http://localhost:8080/images/menu/${image}`}
          alt={foodName}
          className="card-image"
        />
      </div>
      <Card.Body className="text-center">
        <Card.Title className="my-3">{foodName}</Card.Title>
        <Button variant="danger" className="my-3">
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

const MenuCard = ({ image, nama, description, restaurant, price }) => {
  return (
    <Card style={{ width: "22rem", height: "100%" }} className="mb-4">
      <Row noGutters>
        <Col md={4}>
          <Card.Img
            variant="top"
            src={`http://localhost:8080/images/menu/${image}`}
            className="rounded-left"
            style={{ height: "100%", objectFit: "cover" }}
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{nama}</Card.Title>
            <Card.Text style={{ fontSize: "10pt" }} className="mb-3">
              {description}
            </Card.Text>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Text className="text-muted">{restaurant}</Card.Text>
              </div>
              <div>
                <Card.Text className="text-danger font-weight-bold">
                  Rp {price}
                </Card.Text>
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

const ChefCard = ({ image, chefName }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <div>
        <Card.Img
          variant="top"
          src={`http://localhost:8080/images/chef/${image}`}
          alt={chefName}
          style={{ objectFit: "contain", height: "100%" }}
        />
      </div>
      <Card.Body className="text-center">
        <Card.Title>{chefName}</Card.Title>
      </Card.Body>
    </Card>
  );
};

const Home = () => {
  const [menus, setMenu] = useState([]);
  const [food, setFood] = useState([]);
  const [chef, setChef] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getMenu();
      await getFood();
      await getChef();
    };

    fetchData();
  }, []);

  const getMenu = async () => {
    const response = await axios.get(`http://localhost:8080/api/menu`);
    setMenu(response.data);
  };

  const getFood = async () => {
    const response = await axios.get(`http://localhost:8080/api/food`);
    setFood(response.data);
  };

  const getChef = async () => {
    const response = await axios.get(`http://localhost:8080/api/chef`);
    setChef(response.data);
  };

  return (
    <>
      <Header />

      <section className="mt-5 p-4">
        <Row className="head align-items-center py-5 my-5">
          <Col md={6}>
            <h1 className="mb-5">
              MENTALWELL
            </h1>
            <h2>
              <span>
                <Typewriter
                  words={[" adalah platform kesehatan mental yang dirancang sebagai solusi inovatif dalam meningkatkan kesehatan mental mahasiswa melalui test dan pemahaman lebih dalam tentang kesejahteraan mental."]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h2>
            <Link to="/about-us">
              <Button variant="light" className="font-weight-bold" style={{ backgroundColor: "#FFD2DD", borderColor: "#FFD2DD" }}>Baca Selengkapnya</Button>
            </Link>          
          </Col>
          <Col md={6}>
            <img src={illustrasi} alt="Restaurant" className="img-fluid mb-1" />
          </Col>
        </Row>

        <Container className="mt-5">
          <div className="scrollable-cards-container py-5">
            <Row className="flex-nowrap my-5">
              {food.map((food) => (
                <Col key={food.id} className="mr-3">
                  <FoodCard image={food.image} foodName={food.nama} />
                </Col>
              ))}
            </Row>
          </div>
        </Container>

        <Container className="my-5 py-5">
          <h2 className="menu-title my-5">Layanan MentalWell</h2>
          <Row className="text-center align-items-center">
            <Col>
              <Card>
                <Card.Body>
                  <FontAwesomeIcon icon={faBrain} size="2x" className="mb-3" />
                  <Card.Title>MentalWell Test</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <FontAwesomeIcon icon={faSun} size="2x" className="mb-3" />
                  <Card.Title>Daily Insight</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <FontAwesomeIcon icon={faUser} size="2x" className="mb-3" />
                  <Card.Title>Psikolog List</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container className="my-5 py-5">
          <div className="scrollable-cards-container">
            <Row className="flex-nowrap">
              {chef.map((chef) => (
                <Col key={chef.id} className="mr-3">
                  <ChefCard image={chef.image} chefName={chef.nama} />
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>

      <Footer />
</>
);
};

export default Home;
