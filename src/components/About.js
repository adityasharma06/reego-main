import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'; 

const About = () => {
  const [imageURL1, setImageURL1] = useState(null); 
  const [imageURL2, setImageURL2] = useState(null); 
  const storage = getStorage(); 

  useEffect(() => {
    const imageRef1 = ref(storage, 'Reego Chairs/tablechair5.jpg'); 
    const imageRef2 = ref(storage, 'Reego Chairs/table7.jpg');

    getDownloadURL(imageRef1)
      .then((url) => {
        setImageURL1(url); 
      })
      .catch((error) => {
        console.error('Error fetching image 1 URL:', error);
      });

    getDownloadURL(imageRef2)
      .then((url) => {
        setImageURL2(url); 
      })
      .catch((error) => {
        console.error('Error fetching image 2 URL:', error);
      });
  }, [storage]);

  return (
    <Container id="about" fluid className="py-5">
      <Row className="text-center mb-3"> 
        <Col xs={12}>
          <h1 className="display-3 fw-bold mb-2">About Us</h1> 
        </Col>
      </Row>

      <Row className="align-items-center justify-content-center">
        <Col xs={12} md={6} lg={5} className="mb-4">
          <div
            className="bg-light rounded-3 shadow-lg overflow-hidden"
            style={{
              width: '100%',
              maxWidth: '300px', 
              height: 'auto', 
              margin: '0 auto',
              position: 'relative', 
            }}
          >
            {imageURL1 ? (
              <img
                src={imageURL1}
                alt="About Us"
                style={{
                  width: '100%',
                  height: 'auto', 
                  maxHeight: '400px', 
                  objectFit: 'cover', 
                }}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <Spinner animation="border" variant="primary" />
              </div>
            )}
          </div>
        </Col>
        <Col xs={12} md={6} lg={5} className="mb-4 text-center text-md-start">
          <h2 className="display-4 fw-bold mb-4">Our Journey :</h2>
          <p className="lead text-muted">
            Reego is a plastic Moulded Furniture Manufacturing unit based at Jalgaon since 2020.
            Reego is having one of the largest product range Offering 3 year guarantee on selected 
            Products manufactured with imported machines and molds. The brand name of Reego is 
            known for its extensive product range and affordability.
          </p>
        </Col>
      </Row>

      <Row className="align-items-center justify-content-center">
        <Col xs={12} md={6} lg={5} className="mb-4 text-center text-md-end">
          <h2 className="display-4 fw-bold mb-4">Design Philosophy</h2>
          <p className="lead text-muted">
            Every Reego unit is a trendsetter of its own right, oozing with style and functionality to
            enhance the personality of the space it is in—living rooms, offices, commercial spaces, and 
            every other space you can think of.
          </p>
        </Col>
        <Col xs={12} md={6} lg={5} className="mb-4">
          <div
            className="bg-light rounded-3 shadow-lg overflow-hidden"
            style={{
              width: '100%',
              maxWidth: '300px', 
              height: 'auto', 
              margin: '0 auto',
              position: 'relative', 
            }}
          >
            {imageURL2 ? (
              <img
                src={imageURL2}
                alt="Our Journey"
                style={{
                  width: '100%',
                  height: 'auto', 
                  maxHeight: '400px', 
                  objectFit: 'cover', 
                }}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <Spinner animation="border" variant="primary" />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
