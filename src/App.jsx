import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Products from './Components/Products.jsx';  // Correct path to Products.jsx
import Cart from './Components/Cart.jsx';           // Correct path to Cart.jsx
import { FaShoppingCart } from 'react-icons/fa';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Toggle cart modal visibility
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Add product to cart with a quantity
  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  // Delete product from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update cart (useful for cart manipulation)
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="logo">My Shop</div>
        <ul>
          <li><Link to="/">Products</Link></li>
          <li>
            <button onClick={toggleCart} className="cart-icon-button">
              <FaShoppingCart size={30} />
              <span className="cart-count">{cart.length}</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="cart-modal">
          <Cart 
            cart={cart} 
            closeCart={toggleCart} 
            removeFromCart={removeFromCart} 
            updateCart={updateCart}
          />
        </div>
      )}

      <Routes>
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        {/* Set the default route to show Products */}
        <Route path="/" element={<Products addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
