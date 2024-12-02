import React from 'react';
import man from '../man.png';
import woman from '../woman.png';
import { Carousel } from 'react-bootstrap';
import './Testimonial.css'; 

const testimonials = [
  {
    id: 1,
    text: "I recently purchased a set of molded plastic chairs for my dining area, and I couldn't be happier! They're lightweight yet incredibly sturdy, making them perfect for both indoor and outdoor use. The modern design adds a stylish touch to my space, and cleaning them is a breeze. Highly recommend for anyone looking for affordable and functional furniture!",
    author: "Priya K",
    position: "Pune",
    image: woman,
  },
  {
    id: 2,
    text: "These molded plastic chairs exceeded my expectations! We bought them for our office breakout area, and they've been a hit with the team. The vibrant colors and comfortable seating are just what we needed to create a lively atmosphere. Plus, they’ve held up well even with daily use. Great value for money!",
    author: " MR. Rahul Deokar",
    position: "Mumbai",
    image: man,
  },
  {
    id: 3,
    text: "Despite being lightweight, they're very durable and don't wobble. I’ve already recommended them to my neighbors.",
    author: "Sunita Khandelwal",
    position: "Nagpur",
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
