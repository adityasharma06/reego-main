import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Product.css';

export default function Product() {
  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    navigate('/moreproducts');
  };

  const images = [
    './images/image1.jpg',
    './images/image2.jpg',
    './images/image3.jpg',
    './images/image4.jpg',
    './images/image5.jpg',
    './images/image6.jpg'
  ];

  const length = images.length - 1;
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex(index === 0 ? length : index - 1);
  };

  const handleNext = () => {
    setIndex(index === length ? 0 : index + 1);
  };

  return (
    <div className="product-container">
      <div className="product-slider">
        <button className="slider-button left" onClick={handlePrev}>
          &#10094;
        </button>
        <img
          src={images[index]}
          alt="product"
          className="product-img"
        />
        <button className="slider-button right" onClick={handleNext}>
          &#10095;
        </button>

        <div className="overlay">
          <p className="overlay-title">Best Of 2022</p>
          <h2 className="overlay-subtitle">PREMIUM CHAIR QUALITY</h2>
          <button className="overlay-button" onClick={handleViewMoreClick}>
            Know More
          </button>
        </div>
      </div>
    </div>
  );
}
