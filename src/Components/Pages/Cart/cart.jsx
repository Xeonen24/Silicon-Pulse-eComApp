import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
        },
      });

      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.product._id !== productId)
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div className="cart-item" key={item.product._id}>
            <img
                src={item.product.imagePath}
                alt={item.product.title}
                className="item-image"
              />
            <h3 className="cart-item-title">{item.product.title}</h3>
            <p className="cart-item-stock">
              {item.product.available ? 'In Stock' : 'Out of Stock'}
            </p>
            <p className="cart-item-quantity">Quantity: {item.quantity}</p>
            <p className="cart-item-price">Price: {item.product.price}</p>
            <button
              className="cart-item-remove"
              onClick={() => removeFromCart(item.product._id)}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="cart-empty">Your cart is empty.</p>
      )}
      <button className="order-button">Order now</button>
    </div>
  );
};

export default Cart;
