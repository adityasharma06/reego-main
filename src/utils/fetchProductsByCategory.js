// import { getDatabase, ref, query, orderByChild, equalTo, onValue } from 'firebase/database';

// export const fetchProductsByCategory = (category, setProducts, setErrorMessage) => {
//   const db = getDatabase();
//   const productsRef = ref(db, 'products');
//   const categoryQuery = query(productsRef, orderByChild('category'), equalTo(category));

//   onValue(categoryQuery, (snapshot) => {
//     if (snapshot.exists()) {
//       const data = snapshot.val();
//       const productList = Object.values(data); // Convert object to array
//       setProducts(productList);
//     } else {
//       setProducts([]);
//     }
//   }, (error) => {
//     console.error("Error fetching products:", error);
//     setErrorMessage('Failed to fetch products. Please try again.');
//   });
// };
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from 'firebase/database';

export const fetchProductsByCategory = (category, setProducts, setErrorMessage) => {
  const db = getDatabase();
  const productsRef = ref(db, 'products');
  const categoryQuery = query(productsRef, orderByChild('category'), equalTo(category));

  onValue(categoryQuery, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      
      // Map product objects to include their Firebase keys (IDs)
      const productList = Object.keys(data).map((key) => ({
        id: key, // Include the product ID (Firebase key)
        ...data[key] // Spread the rest of the product details
      }));

      setProducts(productList); // Set the products with IDs
    } else {
      setProducts([]); // Empty array if no products
    }
  }, (error) => {
    console.error("Error fetching products:", error);
    setErrorMessage('Failed to fetch products. Please try again.');
  });
};
