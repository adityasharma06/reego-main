import React, { useState, useEffect } from 'react';
import { fetchProductsByCategory } from '../utils/fetchProductsByCategory';
import { Container, Row, Col } from 'react-bootstrap';
import CardProduct from '../components/CardProduct'; 
import './Pages.css';

const TableChairSetPage = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProductsByCategory('Table and Chair Set', setProducts, setErrorMessage);
  }, []);

  return (
    <div className='page-container'>
    <Container className="my-5">
      <h2 className="text-center mb-4">Table and Chair Set</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <Row>
        {products.map((product, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <CardProduct product={product} />
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default TableChairSetPage;
