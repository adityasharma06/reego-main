import React, { useState, useEffect } from 'react';
import { fetchProductsByCategory } from '../utils/fetchProductsByCategory';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import CardProduct from '../components/CardProduct'; 
import './Pages.css';

const ChairPage = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchProductsByCategory('Chair', setProducts, setErrorMessage);
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`); 
  };

  return (
    <div className="page-container">
      <Container className="my-5">
        <h2 className="text-center mb-4">Chairs</h2>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Row>
          {products.map((product, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div onClick={() => handleCardClick(product.id)}>
                <CardProduct product={product} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ChairPage;
