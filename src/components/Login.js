import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      setError('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <div id="login-page" className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-container p-4 shadow-lg rounded">
        <h2 className="login-title text-center mb-4">Admin Login</h2>
        {error && <p className="login-error text-center text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 login-button">
            <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
