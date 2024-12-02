import React from "react";
import "./ProductCategory.css";
import chair from '../images/chair.jpg'
import Tables from '../images/table.jpeg'
import Stools from '../images/stools.jpg'

const ProductCategory = () => {
  return (
    <div className="categories">
      <div className="category chairs">
        <img
          src={chair}  // Replace with actual image path
          alt="Chairs"
          className="category-image"
        />
      </div>

      <div className="category tables">
        <img
          src={Tables}  // Replace with actual image path
          alt="Tables"
          className="category-image"
        />
      </div>

      <div className="category stools">
        <img
          src={Stools}  // Replace with actual image path
          alt="Stools"
          className="category-image"
        />
      </div>
    </div>
  );
};

export default ProductCategory;
