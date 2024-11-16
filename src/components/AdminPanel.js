import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import './AdminPanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTable } from '@fortawesome/free-solid-svg-icons';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [quoteData, setQuoteData] = useState([]); 
  const [selectedProductId] = useState('');
  const [view, setView] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, 'products');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const loadedProducts = [];
      for (let id in data) {
        loadedProducts.push({ id, ...data[id] });
      }
      setProducts(loadedProducts);
    });

    const quoteRef = ref(db, 'UserData');
    onValue(quoteRef, (snapshot) => {
      const quoteData = snapshot.val();
      const loadedQuotes = [];
      for (let id in quoteData) {
        loadedQuotes.push({ id, ...quoteData[id] });
      }
      setQuoteData(loadedQuotes); 
    });
  }, []);

  const handleViewChange = (viewType) => {
    setView(viewType); 
  };

  return (
    <div className="admin-panel d-flex">
      <div className="sidebar d-flex flex-column p-3" style={{ width: '200px', borderRight: '1px solid #ccc' }}>
        <h4 className="text-center mb-4">Admin Options</h4>
        <button
          onClick={() => handleViewChange('add')}
          className="btn btn-primary mb-3"
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Product
        </button>
        <button
          onClick={() => handleViewChange('edit')}
          className="btn btn-primary mb-3"
        >
          <FontAwesomeIcon icon={faEdit} className="me-2" />
          Edit Product
        </button>
        <button
          onClick={() => handleViewChange('quote')}
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon={faTable} className="me-2" />
          Show Get a Quote Data
        </button>
      </div>

      <div className="content-section flex-grow-1 p-4">
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {view === 'add' && (
          <div className="add-edit-form">
            <AddProduct setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />
          </div>
        )}

        {view === 'edit' && (
          <div className="add-edit-form">
            <EditProduct
              products={products}
              selectedProductId={selectedProductId}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
          </div>
        )}

        {view === 'quote' && (
          <div className="quote-table-section">
            <h3 className="text-center mb-4">Get a Quote Data</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Product</th>
                </tr>
              </thead>
              <tbody>
                {quoteData.length > 0 ? (
                  quoteData.map((quote) => (
                    <tr key={quote.id}>
                      <td>{quote.Name}</td>
                      <td>{quote.Contact}</td>
                      <td>{quote.Email}</td>
                      <td>{quote.Message}</td>
                      <td>{quote.Product}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
