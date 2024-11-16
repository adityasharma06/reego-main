import React, { useState } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddProduct = ({ setSuccessMessage, setErrorMessage }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    weight: '',
    guarantee: '',
    price: '',
    image: null,
    category: '',
    colors: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase();
    const storage = getStorage();
    const dbRef = ref(db, 'products');
    const newProductRef = push(dbRef);

    try {
      let imageURL = '';

      if (product.image) {
        const imageRef = storageRef(storage, `images/${product.image.name}`);
        await uploadBytes(imageRef, product.image);
        imageURL = await getDownloadURL(imageRef);
      }

      await set(newProductRef, {
        name: product.name,
        description: product.description,
        weight: product.weight,
        guarantee: product.guarantee,
        price: product.price,
        category: product.category,
        colors: product.colors.split(',').map(color => color.trim()),
        imageURL: imageURL,
      });

      setProduct({
        name: '',
        description: '',
        weight: '',
        guarantee: '',
        price: '',
        image: null,
        category: '',
        colors: ''
      });

      setSuccessMessage('Product added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (error) {
      console.error("Error adding product:", error);
      setErrorMessage('Failed to add product. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="border p-4 shadow-sm bg-light rounded">
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
                    <button type="submit" className="btn btn-primary w-40">Add Product</button>
                </div>
    </form>
  );
};

export default AddProduct;
