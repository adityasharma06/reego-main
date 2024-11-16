import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
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

function App() {
  return (
    <div className="App">
      <Router>
        {/* Navigation Bar */}
        <NavbarComponent />

        {/* Main Content */}
        <Container fluid className="main-content">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Product />
                  <ProductCategory />
                  <MoreProducts />
                  <Testimonial />
                  <GetQuote />
                  <Contact />
                </>
              }
            />

            {/* Additional Pages */}
            <Route
              path="/contact"
              element={
                <Container fluid className="contacts">
                  <GetQuote />
                  <Contact />
                </Container>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/moreproducts" element={<MoreProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/chairs" element={<Chairs />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/sets" element={<Sets />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Panel with Private Route */}
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPanel />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
