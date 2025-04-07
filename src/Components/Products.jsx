import React, { useState, useEffect } from 'react';
import '../App.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 🔍 Product Detail View
  if (selectedProduct) {
    return (
      <div className="product-detail">
        <button onClick={() => setSelectedProduct(null)} className="back-button">← Back</button>
        <h1>{selectedProduct.title}</h1>
        <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="detail-image" />
        <p>{selectedProduct.description}</p>
        <p className="product-price">Price: ${selectedProduct.price}</p>
      </div>
    );
  }

  // 🛍 Product List View
  return (
    <div className="product-list">
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="product-item"
            onClick={() => setSelectedProduct(product)}
            style={{ cursor: 'pointer' }}
          >
            <img src={product.thumbnail} alt={product.title} className="product-image" />
            <h2>{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <input type="number" min="1" defaultValue="1" className="quantity-input" />
            <button className="add-button">Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;

