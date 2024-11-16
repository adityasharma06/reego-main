import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ref, onValue } from 'firebase/database';
import { getDatabase } from 'firebase/database';  
import { useNavigate } from 'react-router-dom';
import './MoreProducts.css';

const MoreProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase(); 
    const dbRef = ref(db, 'products'); 

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        const productsArray = Object.keys(data).map((key) => ({
          id: key,
          name: data[key].name,
          price: data[key].price,
          imageURL: data[key].imageURL, 
          category: data[key].category,
        }));

        setProducts(productsArray);
      } else {
        console.log('No product data available.');
        setProducts([]);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching product data:', error);
      setError('Failed to fetch product data.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`); 
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  const categories = ['Chair', 'Table', 'Table and Chair Set'];
  const groupedProducts = categories.reduce((acc, category) => {
    acc[category] = products.filter(product => product.category === category);
    return acc;
  }, {});

  return (
    <Container className="mt-4" id="moreproducts">
      <h1>Our Products</h1>
      {categories.map((category) => (
        <div key={category} className="mb-5">
          <h2>{category}</h2>
          <Row>
            {groupedProducts[category].length > 0 ? (
              groupedProducts[category].map((product) => (
                <Col lg={3} md={4} sm={6} key={product.id} className="mb-4">
                  <Card className="product-card h-100" onClick={() => handleCardClick(product.id)}>
                    <Card.Img
                      variant="top"
                      src={product.imageURL} 
                      alt={product.name}
                      className="card-img"
                    />
                    <Card.Body className="text-center">
                      <Card.Title className="card-title">{product.name}</Card.Title>
                      <Card.Text className="card-text"><strong> ₹ {product.price}</strong></Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p>No products available in this category.</p>
              </Col>
            )}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default MoreProducts;

