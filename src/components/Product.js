import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Product.css';

// Import images
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpg';


export default function Product() {
  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    navigate('/moreproducts');
  };

  const images = [image1, image2, image3, image4, image5, image6];

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
          <p className="overlay-title">Best Of 2023</p>
          <h2 className="overlay-subtitle">PREMIUM QUALITY CHAIRS AND TABLE </h2>
          <button className="overlay-button" onClick={handleViewMoreClick}>
            Know More
          </button>
        </div>
      </div>
    </div>
  );
}
