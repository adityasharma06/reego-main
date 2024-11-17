import React from "react";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contact.css'; 

const Contact = () => {
  return (
    <footer className="footer glassmorphism-footer">
      <div className="container py-5">
        <div className="row">
          {/* Useful Links Section */}
          <div className="col-md-3 mb-4">
            <h5 className="text-black">Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-black">Home</a></li>
              <li><a href="#about" className="text-black">About</a></li>
              <li><a href="/moreproducts" className="text-black">Products</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-3 mb-4">
            <h5 className="text-black">Contact</h5>
            <address className="text-black">
              Dr. Ingles Cancer Laparoscopy Clinic & Surgical Hospital, <br />
              Jalgaon HO, Jalgaon, Maharashtra, 425001
            </address>
            <p className="text-black mb-0">Phone: +91-9823441662</p>
          </div>

          {/* Connect Section */}
          <div className="col-md-3 mb-4">
            <h5 className="text-black">Connect</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center my-2">
                <FaFacebookF className="me-2" />
                <a href="https://www.facebook.com/reegochairs" target="_blank" rel="noopener noreferrer" className="text-black">
                  Facebook
                </a>
              </li>
              <li className="d-flex align-items-center my-2">
                <FaInstagram className="me-2" />
                <a href="https://www.instagram.com/reegochairs" target="_blank" rel="noopener noreferrer" className="text-black">
                  Instagram
                </a>
              </li>
              <li className="d-flex align-items-center my-2">
                <FaYoutube className="me-2" />
                <a href="https://www.youtube.com/@reegochairs" target="_blank" rel="noopener noreferrer" className="text-black">
                  YouTube
                </a>
              </li>
              <li className="d-flex align-items-center my-2">
                <MdEmail className="me-2" />
                <a href="mailto:sales@reegochairs.com" className="text-black">
                  Email
                </a>
              </li>
              <li className="d-flex align-items-center my-2">
                <FaPhoneAlt className="me-2" />
                <a href="tel:+9730189700" className="text-black">
                  Phone
                </a>
              </li>
            </ul>
          </div>

          {/* Payments Section */}
          <div className="col-md-3">
            <h5 className="text-black">Payments</h5>
            <div className="payment-icons d-flex flex-wrap">
              <img src={`${process.env.PUBLIC_URL}/payment/amex.png`} alt="Amex" className="img-fluid me-2 mb-2" />
              <img src={`${process.env.PUBLIC_URL}/payment/mastercard.png`} alt="Mastercard" className="img-fluid me-2 mb-2" />
              <img src={`${process.env.PUBLIC_URL}/payment/visa.png`} alt="Visa" className="img-fluid me-2 mb-2" />
              <img src={`${process.env.PUBLIC_URL}/payment/rupay.png`} alt="RuPay" className="img-fluid me-2 mb-2" />
              <img src={`${process.env.PUBLIC_URL}/payment/netbanking.png`} alt="Net Banking" className="img-fluid me-2 mb-2" />
              <img src={`${process.env.PUBLIC_URL}/payment/paytm.png`} alt="Paytm" className="img-fluid me-2 mb-2" />
              <img src={`${process.env.PUBLIC_URL}/payment/paypal.png`} alt="PayPal" className="img-fluid me-2 mb-2" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
