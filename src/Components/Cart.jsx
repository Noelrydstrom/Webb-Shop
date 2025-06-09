import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

function Cart({ closeCart }) {
  const { cart, removeFromCart, updateCart } = useContext(CartContext);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
  });

  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const increaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      updateCart(updatedCart);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const calculateTotal = () => {
    let totalPrice = 0;
    let totalQuantity = 0;
    cart.forEach(item => {
      totalPrice += item.quantity * item.price;
      totalQuantity += item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  const { totalPrice, totalQuantity } = calculateTotal();

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handlePurchase = () => {
    updateCart([]); // Töm varukorgen
    setPurchaseComplete(true); // Visa tackmeddelande
  };

  return (
    <div className="cart-modal-content">
      <button onClick={closeCart} className="close-cart-button">Close Cart</button>
      <h2>Your Cart</h2>

      {purchaseComplete ? (
        <h3 style={{ color: 'green', textAlign: 'center' }}>Tack för ditt köp!</h3>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p className="cart-item-price">Price: ${item.price}</p>

                  <div className="cart-item-controls">
                    <div className="quantity-edit">
                      <button className="quantity-button" onClick={() => decreaseQuantity(item)}>-</button>
                      <input
                        type="number"
                        value={item.quantity}
                        className="quantity-input"
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value, 10);
                          if (!isNaN(newQty) && newQty > 0) {
                            const updatedCart = cart.map((cartItem) =>
                              cartItem.id === item.id
                                ? { ...cartItem, quantity: newQty }
                                : cartItem
                            );
                            updateCart(updatedCart);
                          }
                        }}
                      />
                      <button className="quantity-button" onClick={() => increaseQuantity(item)}>+</button>
                    </div>

                    <button className="remove-button" onClick={() => handleRemove(item.id)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <h3>Shipping Information</h3>
          <div className="shipping-info">
            <label htmlFor="firstName">First Name</label>
            <textarea id="firstName" name="firstName" value={shippingInfo.firstName} onChange={handleShippingChange} rows="1" />

            <label htmlFor="lastName">Last Name</label>
            <textarea id="lastName" name="lastName" value={shippingInfo.lastName} onChange={handleShippingChange} rows="1" />

            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" value={shippingInfo.address} onChange={handleShippingChange} rows="3" />
          </div>

          <div className="cart-summary">
            <h3>Summary</h3>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>

            <button
              onClick={handlePurchase}
              style={{
                marginTop: '20px',
                padding: '12px 25px',
                backgroundColor: '#1a4a93',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
