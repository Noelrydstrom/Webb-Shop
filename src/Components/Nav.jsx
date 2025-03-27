// src/Components/Nav.jsx
import React from 'react';  // Import React
import '../App.css';  // Import the global App.css file for styling

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="logo">My Shop</div>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#shopping-cart">Shopping Cart</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
