import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/cart', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtoken')}`, 
        },
      })
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const removeFromCart = (productId) => {
    axios
      .delete(`http://localhost:5000/api/cart/remove/${productId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCartItems(cartItems.filter((item) => item.product._id !== productId));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <div key={item.product._id}>
          <h3>{item.product.title}</h3>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.product._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
