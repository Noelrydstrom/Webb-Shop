import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Products from './Components/Products.jsx';
import Cart from './Components/Cart.jsx';
import { FaShoppingCart } from 'react-icons/fa';
import { CartProvider, CartContext } from './contexts/CartContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartProvider>
      <Router>
        <nav className="navbar">
          <div className="logo">My Shop</div>
          <ul>
            <li><Link to="/">Products</Link></li>
            <li>
              <button onClick={toggleCart} className="cart-icon-button">
                <FaShoppingCart size={30} />
                {/* Visa antal produkter med hjälp av context */}
                <CartContext.Consumer>
                  {({ cart }) => (
                    <span className="cart-count">{cart.length}</span>
                  )}
                </CartContext.Consumer>
              </button>
            </li>
          </ul>
        </nav>

        {/* Cart Modal */}
        {isCartOpen && (
          <div className="cart-modal">
            <Cart closeCart={toggleCart} />
          </div>
        )}

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id?" element={<Products />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
