import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);

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
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.product._id}>
            <h3>{item.product.title}</h3>
            <p>{item.product.available ? 'In Stock' : 'Out of Stock'}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.product.price}</p>
            <button onClick={() => removeFromCart(item.product._id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button>Order now</button>
    </div>
  );
};

export default Cart;
