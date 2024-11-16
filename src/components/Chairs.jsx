import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ref, onValue } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './MoreProducts.css';

const Chairs = () => {
  const [chairs, setChairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, 'products');

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          const chairsArray = Object.keys(data)
            .map((key) => ({
              id: key,
              name: data[key].name,
              price: data[key].price,
              imageURL: data[key].imageURL,
              category: data[key].category,
            }))
            .filter((product) => product.category === 'Chair'); // Filter for "Chair" category

          setChairs(chairsArray);
        } else {
          console.log('No product data available.');
          setChairs([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching product data:', error);
        setError('Failed to fetch product data.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <p>Loading chairs...</p>;
  if (error) return <p>Error loading chairs: {error}</p>;

  return (
    <Container className="mt-4" id="chairs">
      <h1>Chairs</h1>
      <Row>
        {chairs.length > 0 ? (
          chairs.map((chair) => (
            <Col lg={3} md={4} sm={6} key={chair.id} className="mb-4">
              <Card className="product-card h-100" onClick={() => handleCardClick(chair.id)}>
                <Card.Img
                  variant="top"
                  src={chair.imageURL}
                  alt={chair.name}
                  className="card-img"
                />
                <Card.Body className="text-center">
                  <Card.Title className="card-title">{chair.name}</Card.Title>
                  <Card.Text className="card-text">
                    <strong>₹ {chair.price}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No chairs available at the moment.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Chairs;
