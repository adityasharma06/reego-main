import React from 'react';
import './Gallery.css'; 
import post16 from '../gallery/post16.jpg';
import post17 from '../gallery/post17.jpg';
import post18 from '../gallery/post18.jpg';
import post19 from '../gallery/post19.jpg';
import post20 from '../gallery/post20.jpg';
import post21 from '../gallery/post21.jpg';
import post22 from '../gallery/post22.jpg';
import post23 from '../gallery/post23.jpg';
import post24 from '../gallery/post24.jpg';

const Gallery = () => {
  return (
    
    <div className="container my-5" id="gallery">
      <div className="row justify-content-center">
      

        <div className="col-12 col-md-4 mb-4">
          <img
            src={post16}
            className="img-fluid shadow hover-shadow"
            alt="Gallery Item"
          />
          <img
            src={post17}
            className="img-fluid shadow hover-shadow mt-4"
            alt="Gallery Item"
          />
          <img
            src={post18}
            className="img-fluid shadow hover-shadow mt-4"
            alt="Gallery Item"
          />
        </div>


        <div className="col-12 col-md-4 mb-4">
          <img
            src={post19}
            className="img-fluid shadow hover-shadow"
            alt="Gallery Item"
          />
          <img
            src={post20}
            className="img-fluid shadow hover-shadow mt-4"
            alt="Gallery Item"
          />
          <img
            src={post21}
            className="img-fluid shadow hover-shadow mt-4"
            alt="Gallery Item"
          />
        </div>

        <div className="col-12 col-md-4 mb-4">
          <img
            src={post22}
            className="img-fluid shadow hover-shadow"
            alt="Gallery Item"
          />
          <img
            src={post23}
            className="img-fluid shadow hover-shadow mt-4"
            alt="Gallery Item"
          />
          <img
            src={post24}
            className="img-fluid shadow hover-shadow mt-4"
            alt="Gallery Item"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
