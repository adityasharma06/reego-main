import React from 'react';
import man from '../man.png';
import woman from '../woman.png';
import { Carousel } from 'react-bootstrap';
import './Testimonial.css'; 

const testimonials = [
  {
    id: 1,
    text: "This chair is amazing! It changed the way I work.",
    author: "Person 1",
    position: "CEO, Company A",
    image: man,
  },
  {
    id: 2,
    text: "Very comfortable and stylish. Highly recommended.",
    author: "Person 2",
    position: "Designer, Company B",
    image: man,
  },
  {
    id: 3,
    text: "Exceptional quality and excellent customer service.",
    author: "Person 3",
    position: "Manager, Company C",
    image: woman,
  },
];

const Testimonials = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">What Our Customers Say</h2>
      <Carousel>
        {testimonials.map((testimonial) => (
          <Carousel.Item key={testimonial.id}>
            <div className="testimonial-content d-flex justify-content-center align-items-center flex-column text-center p-4">
              <img
                className="testimonial-image mb-3"
                src={testimonial.image}
                alt={testimonial.author}
              />
              <p className="lead testimonial-text">{testimonial.text}</p>
              <h5 className="mt-3">{testimonial.author}</h5>
              <small>{testimonial.position}</small>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;
