import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import Home from './components/Home';
import About from './components/About';
import Product from './components/Product';
import GetQuote from './components/GetQuote';
import Contact from './components/Contact';
import MoreProducts from './components/MoreProducts';
import ProductDetails from './components/ProductDetails';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Testimonial from './components/Testimonial';
import PrivateRoute from './components/PrivateRoute';
import ProductCategory from './components/ProductCategory';
import Chairs from './components/Chairs';
import Tables from './components/Tables';
import Sets from './components/Sets';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router basename="/reego-main">
      <NavbarComponent />
      <Routes>
        <Route
          path="/"
          element={
            <Container fluid className="main-content">
              <Home />
              <Product />
              <ProductCategory />
              <MoreProducts />
              <Testimonial />
              <GetQuote />
              <Contact />
            </Container>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/moreproducts" element={<MoreProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/Chairs" element={<Chairs />} />
        <Route path="/Sets" element={<Sets />} />
        <Route path="/Tables" element={<Tables />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
