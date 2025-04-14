// Products.jsx
import React, { useState, useEffect } from 'react';
import '../App.css';

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the selected product for the modal

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

  const openProductDetail = (product, e) => {
    e.stopPropagation(); // Prevent modal opening when interacting with buttons
    setSelectedProduct(product); // Set the selected product for the modal
  };

  const closeProductDetail = () => {
    setSelectedProduct(null); // Close the modal
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Prevent the modal from opening when adding to cart
    const quantity = 1; // Always add 1 item from homepage
    addToCart(product, quantity);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="product-item"
            onClick={(e) => openProductDetail(product, e)} // Open product detail modal
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <h2>{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <button
              className="add-button"
              onClick={(e) => handleAddToCart(product, e)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="product-modal">
          <div className="product-modal-content">
            <button className="close-modal" onClick={closeProductDetail}>
              &times;
            </button>
            <img
              src={selectedProduct.image || selectedProduct.thumbnail}
              alt={selectedProduct.title}
              className="large-product-image"
            />
            <h2>{selectedProduct.title}</h2>
            <p className="description">{selectedProduct.description}</p>
            <p className="price"><strong>Price:</strong> ${selectedProduct.price}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
