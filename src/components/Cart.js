import React, { useEffect, useState } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { realtimeDb } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const cartRef = ref(realtimeDb, `cart`);
    const cartListener = onValue(cartRef, (snapshot) => {
      if (snapshot.exists()) {
        const cartData = snapshot.val();
        setCartItems(Object.values(cartData));
      } else {
        setCartItems([]);
      }
    });

    return () => cartListener();
  }, []);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();

    const quoteRef = ref(realtimeDb, `quotes`);
    const newQuoteRef = push(quoteRef);
    await set(newQuoteRef, {
      name,
      email,
      message,
      cartItems,
      timestamp: new Date().toISOString(),
    });

    setName('');
    setEmail('');
    setMessage('');
    alert('Quote request submitted successfully!');
  };

  return (
    <div className="container mt-5 cart-page">
      <h2 className="text-center mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="row">
          {cartItems.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">₹{item.price}</h6>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No items in cart.</p>
      )}

      {cartItems.length > 0 && (
        <div className="get-quote-section mt-5">
          <h3 className="text-center mb-4">Get a Quote</h3>
          <form onSubmit={handleQuoteSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  id="name"
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                className="form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Submit Quote</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart;
