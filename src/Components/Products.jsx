// src/Components/Products.jsx
import React, { useState, useEffect } from 'react';
import '../App.css'; // Correct path to App.css

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        console.log(data.products); // Log the products to see if the `image` field is there
        setProducts(data.products);
        setLoading(false);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-item">
            {/* Product Image */}
            <img src={product.thumbnail} alt={product.title} className="product-image" />

            <h2>{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <p className="Cart">Add</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
