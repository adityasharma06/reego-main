import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../logo.png';

const Home = () => {
  return (
    <Container id="home" fluid className="mt-5">
      <Row className="align-items-center justify-content-center text-center text-md-start">
        <Col xs={12} md={6} lg={5} className="mb-4">
          <h1 className="display-3 fw-bold mb-3">Reego</h1>
          <h2 className="display-4 text-muted mb-4">Design for Everyday Comfort</h2>
          <p className="lead mb-4">
            At Reego, we bring your ideas to life with our furniture. Whether it's modern chairs, stylish tables, or functional storage, we combine smart design with chic style to make your space both stunning and practical.
          </p>
          
        </Col>
        <Col xs={12} md={6} lg={5} className="text-center text-md-end">
          <img
            src={logo}
            alt="Reego"
            className="img-fluid rounded-3 shadow-lg"
            style={{ maxHeight: '600px', objectFit: 'cover', width: '100%' }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
