import React, { useState, useEffect } from 'react';
import { getDatabase, ref, update, remove, get } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditProduct = ({ setSuccessMessage, setErrorMessage }) => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [product, setProduct] = useState({
    name: '',
    description: '',
    weight: '',
    guarantee: '',
    price: '',
    image: null,
    category: '',
    colors: '',
    imageURL: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getDatabase();
      const productsRef = ref(db, 'products');
      const snapshot = await get(productsRef);
      const productsList = [];

      snapshot.forEach((childSnapshot) => {
        productsList.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });

      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      const selectedProduct = products.find(product => product.id === selectedProductId);
      if (selectedProduct) {
        setProduct({ ...selectedProduct, image: null }); 
      }
    }
  }, [selectedProductId, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();

    if (!selectedProductId) {
      setErrorMessage('Please select a product to update.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    const db = getDatabase();
    const storage = getStorage();
    const productRef = ref(db, `products/${selectedProductId}`);

    try {
      let imageURL = product.imageURL;

      if (product.image) {
        const imageRef = storageRef(storage, `images/${product.image.name}`);
        await uploadBytes(imageRef, product.image);
        imageURL = await getDownloadURL(imageRef);
      }

    const colorsArray = Array.isArray(product.colors)
    ? product.colors 
    : typeof product.colors === 'string'
    ? product.colors.split(',').map(color => color.trim()) 
    : [];

      const updatedProduct = {
        name: product.name,
        description: product.description,
        weight: product.weight,
        guarantee: product.guarantee,
        price: product.price,
        category: product.category,
        colors: colorsArray, 
        imageURL 
      };

      await update(productRef, updatedProduct);

      setSuccessMessage('Product updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setSelectedProductId('');
      setProduct({
        name: '',
        description: '',
        weight: '',
        guarantee: '',
        price: '',
        image: null,
        category: '',
        colors: '',
        imageURL: ''
      });

    } catch (error) {
      console.error("Error updating product:", error);
      setErrorMessage('Failed to update product. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProductId) {
      setErrorMessage('Please select a product to delete.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    const db = getDatabase();
    const productRef = ref(db, `products/${selectedProductId}`);

    try {
      await remove(productRef);
      const updatedProducts = products.filter(product => product.id !== selectedProductId);
      setProducts(updatedProducts);
      setSelectedProductId('');
      setProduct({
        name: '',
        description: '',
        weight: '',
        guarantee: '',
        price: '',
        image: null,
        category: '',
        colors: '',
        imageURL: ''
      });
      setSuccessMessage('Product deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrorMessage('Failed to delete product. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <form className="border p-4 shadow-sm bg-light rounded">
      <div className="form-group mb-3">
        <label htmlFor="productSelect">Select Product</label>
        <select
          className="form-control"
          id="productSelect"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>

      {selectedProductId && (
        <>
          <div className="form-group mb-3">
            <label htmlFor="name">Product Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="name"
              name="name" 
              value={product.name} 
              onChange={handleInputChange} 
              placeholder="Enter product name" 
              required 
            />
          </div>
          
          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <input 
              type="text" 
              className="form-control" 
              id="description"
              name="description" 
              value={product.description} 
              onChange={handleInputChange} 
              placeholder="Enter description" 
              required 
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="weight">Weight (kg)</label>
            <input 
              type="number" 
              className="form-control" 
              id="weight"
              name="weight" 
              value={product.weight} 
              onChange={handleInputChange} 
              placeholder="Enter weight" 
              required 
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="guarantee">Guarantee</label>
            <input 
              type="text" 
              className="form-control" 
              id="guarantee"
              name="guarantee" 
              value={product.guarantee} 
              onChange={handleInputChange} 
              placeholder="Enter guarantee period" 
              required 
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="price">Price ($)</label>
            <input 
              type="number" 
              className="form-control" 
              id="price"
              name="price" 
              value={product.price} 
              onChange={handleInputChange} 
              placeholder="Enter product price" 
              required 
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="image">Product Image</label>
            <input 
              type="file" 
              className="form-control-file" 
              id="image"
              name="image" 
              onChange={handleFileChange} 
              accept="image/png, image/jpeg, image/jpg" 
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select category</option>
              <option value="Chair">Chair</option>
              <option value="Table">Table</option>
              <option value="Table and Chair Set">Table and Chair Set</option>
            </select>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="colors">Available Colors</label>
            <input 
              type="text" 
              className="form-control" 
              id="colors"
              name="colors" 
              value={product.colors} 
              onChange={handleInputChange} 
              placeholder="Enter available colors (comma separated)" 
              required 
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-40 me-2" onClick={handleEditProduct}>Update Product</button>
            <button type="button" className="btn btn-danger w-40" onClick={handleDeleteProduct}>Delete Product</button>
          </div>
        </>
      )}
    </form>
  );
};

export default EditProduct;
