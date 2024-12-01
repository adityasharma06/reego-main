import React from "react";
import "./ProductCategory.css";
import chair from '../images/chair.jpg'
import Tables from '../images/tables.jpg'
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
        <h3 className="category-title chairs">CHAIRS</h3>
      </div>

      <div className="category tables">
        <img
          src={Tables}  // Replace with actual image path
          alt="Tables"
          className="category-image"
        />
        <h3 className="category-title tables">TABLES</h3>
      </div>

      <div className="category stools">
        <img
          src={Stools}  // Replace with actual image path
          alt="Stools"
          className="category-image"
        />
        <h3 className="category-title stools">STOOLS</h3>
      </div>
    </div>
  );
};

export default ProductCategory;
