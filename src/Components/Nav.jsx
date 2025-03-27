import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import shopping cart icon
import '../App.css';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="logo">My Shop</div>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        <li>
          <a href="#shopping-cart">
            <FaShoppingCart size={50} /> {/* Shopping cart icon */}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
