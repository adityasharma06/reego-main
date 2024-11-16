import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue, push, set } from 'firebase/database';
import { realtimeDb } from '../firebase';
import './ProductDetails.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sortOption, setSortOption] = useState('latest');

  useEffect(() => {
    
    const productRef = ref(realtimeDb, `products/${id}`);
    const productListener = onValue(productRef, (snapshot) => {
      if (snapshot.exists()) {
        setProduct(snapshot.val());
      } else {
        setProduct(null); 
      }
      setLoading(false);  
    });

    return () => productListener();
  }, [id]);  

  useEffect(() => {
    const feedbackRef = ref(realtimeDb, `feedbacks/${id}`);
    const feedbackListener = onValue(feedbackRef, (snapshot) => {
      if (snapshot.exists()) {
        const feedbacksData = snapshot.val();
        const feedbacksArray = Object.values(feedbacksData);
        setAllFeedbacks(feedbacksArray);
      } else {
        setAllFeedbacks([]);
      }
    });

    return () => feedbackListener();
  }, [id]);  

  useEffect(() => {
    if (allFeedbacks.length > 0) {
      const sortedFeedbacks = [...allFeedbacks].sort((a, b) => {
        return sortOption === 'latest'
          ? new Date(b.timestamp) - new Date(a.timestamp)
          : new Date(a.timestamp) - new Date(b.timestamp);
      });
      setAllFeedbacks(sortedFeedbacks);
    }
  }, [sortOption, allFeedbacks]);  

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() && email.trim() && feedback.trim() && rating > 0) {
      const feedbackRef = ref(realtimeDb, `feedbacks/${id}`);
      const newFeedbackRef = push(feedbackRef);
      const timestamp = new Date().toISOString();
      await set(newFeedbackRef, { name, email, feedback, rating, timestamp });

      setName('');
      setEmail('');
      setFeedback('');
      setRating(0);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center mt-5">No product found.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 text-center">
          {product.imageURLs && product.imageURLs.length > 0 ? (
            <div id="product-carousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {product.imageURLs.map((imageURL, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  >
                    <img
                      src={imageURL}
                      alt={`Slide ${index + 1}`}
                      className="d-block w-100"
                    />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#product-carousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#product-carousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          ) : (
            <img
              src={product.imageURL}
              alt={product.name}
              className="img-fluid rounded shadow-lg mb-4"
              id="product-image"
            />
          )}
        </div>
        <div className="col-md-6">
          <h1 className="display-5"><strong>{product.name}</strong></h1>
          <p className="h4 text-success"><strong>₹{product.price}</strong></p>
          <p className="lead"><strong>Description:</strong> {product.description}</p>
          <p><strong>Weight:</strong> {product.weight}</p>
          <p><strong>Guarantee:</strong> {product.guarantee}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Available Colors:</strong> {product.colors} </p>

          <button
            className="btn btn-outline-primary mb-3"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Hide Feedback Form' : 'Give Feedback'}
          </button>

          {showForm && (
            <form onSubmit={handleFeedbackSubmit} className="mb-4">
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="feedback">Your Feedback</label>
                <textarea
                  id="feedback"
                  className="form-control"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter your feedback"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="rating">Rating</label>
                <div id="rating" className="d-flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${rating >= star ? 'filled' : ''}`}
                      onClick={() => setRating(star)}
                      role="button"
                      aria-label={`Rate ${star} stars`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn btn-success">Submit Feedback</button>
            </form>
          )}

          <div className="feedbacks-section mt-4">
            <h3>Feedbacks</h3>
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="sortOption" className="me-2">Sort By</label>
              <select
                id="sortOption"
                className="form-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="earliest">Earliest</option>
              </select>
            </div>
            {allFeedbacks.length > 0 ? (
              allFeedbacks.map((fb, index) => (
                <div key={index} className="feedback-card p-3 mb-2">
                  <strong>{fb.name}</strong> ({fb.email})
                  <div className="d-flex justify-content-between">
                    <span>{fb.feedback}</span>
                    <span>Rating: {fb.rating} ★</span>
                  </div>
                  <small className="text-muted">{new Date(fb.timestamp).toLocaleDateString()}</small>
                </div>
              ))
            ) : (
              <p>No feedbacks yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
