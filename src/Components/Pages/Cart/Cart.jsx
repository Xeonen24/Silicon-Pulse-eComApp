import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtoken")}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cartItems]);

  const updatedCartItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((cartItem) => cartItem.product._id === item.product._id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtoken")}`,
        },
      });

      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.product._id !== productId)
      );
      //window.location.reload();
      toast.error("item Removed from Cart Successfully", {
        autoClose: 2000,
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove-all`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
        },
      });
      setCartItems([]);
      toast.success("Cart Cleared Successfully", {
        autoClose: 2000,
        position: "top-right",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  
  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:5000/api/cart/remove-all", {
        withCredentials: true,
      });
      setCartItems([]);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      await axios.post(
        'http://localhost:5000/api/cart/dec',
        {
          productId,
          quantity: -1,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
          },
        }
      );

      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.product._id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );

      const updatedItem = cartItems.find((item) => item.product._id === productId);
      if (updatedItem.quantity === 1) {
        removeFromCart(productId); // Call the removeFromCart function
        window.location.reload();
      }

      toast.error("Item Removed from cart", {
        autoClose: 2000,
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      await axios.post(
        'http://localhost:5000/api/cart/inc',
        {
          productId,
          quantity: 1,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
          },
        }
      );

      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.product._id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      toast.success("Item Added to cart", {
        autoClose: 2000,
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.reduce((updatedItems, item) => {
            const existingItemIndex = updatedItems.findIndex(
              (cartItem) => cartItem.product._id === item.product._id
            );
            if (existingItemIndex !== -1) {
              updatedItems[existingItemIndex].quantity += item.quantity;
            } else {
              updatedItems.push(item);
            }
            return updatedItems;
          }, []).map((item) => (
            <div className="cart-item" key={item.product._id}>
              <img
                src={item.product.imagePath}
                alt={item.product.title}
                className="item-image"
              />
              <h3 className="cart-item-title">{item.product.title}</h3>
              <div className="cart-item-quantity">
                <button
                  className="quantity-button"
                  onClick={() => decreaseQuantity(item.product._id)}
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  className="quantity-button"
                  onClick={() => increaseQuantity(item.product._id)}
                >
                  +
                </button>
              </div>
              <p className="cart-item-price">Price: {item.product.price * item.quantity}</p>
              <button
                className="cart-item-remove"
                onClick={() => removeFromCart(item.product._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <h4 className="cart-total-price">Total Price: {totalPrice}</h4>
          <div className="order-buttons-container">
            <button className="cart-clear" onClick={() => clearCart()}>
              Clear Cart
            </button>
            <button className="order-button">Order now</button>
          </div>
        </>
      ) : (
        <p className="cart-empty">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
