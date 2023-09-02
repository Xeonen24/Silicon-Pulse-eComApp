import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cart.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_URL + "/cart/cart", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
    const existingItem = acc.find(
      (cartItem) => cartItem.product._id === item.product._id
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      await axios.delete(
        process.env.REACT_APP_URL + `/cart/cart/remove/${productId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.product._id !== productId)
      );
      toast.error("item Removed from Cart Successfully", {
        autoClose: 2000,
        position: "top-right",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await axios.delete(process.env.REACT_APP_URL + `/cart/cart/remove-all`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setCartItems([]);
      toast.success("Cart Cleared Successfully", {
        autoClose: 2000,
        position: "top-right",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const decreaseQuantity = async (productId) => {
    setLoading(true);
    try {
      await axios.post(
        process.env.REACT_APP_URL + "/cart/cart/dec",
        {
          productId,
          quantity: -1,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );

      const updatedItem = cartItems.find(
        (item) => item.product._id === productId
      );
      if (updatedItem.quantity === 1) {
        removeFromCart(productId);
        window.location.reload();
      }

      toast.info("Updated quantity.", {
        autoClose: 2000,
        position: "top-right",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const increaseQuantity = async (productId) => {
    setLoading(true);
    try {
      await axios.post(
        process.env.REACT_APP_URL + "/cart/cart/inc",
        {
          productId,
          quantity: 1,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.info("Updated quantity.", {
        autoClose: 2000,
        position: "top-right",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const placeOrder = () => {
    navigate("/order", {
      state: {
        cartItems,
        totalPrice,
      },
    });
  };

  return (
    <>
      {loading ? (
        <div className="page-loading">
          <div className="spinner"></div>
        </div>
      ) : (

          <div className="cart-container">
            <h2 className="cart-head">Cart</h2>
            {cartItems.length > 0 ? (
              <div className="wrapper">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.product._id}>
                    <div className="cart-card">
                      <Link style={{display:'flex'}}to={`/product/${item.product._id}`}>
                        <img
                          src={item.product.imagePath}
                          alt={item.product.title}
                          className="item-image"
                        />
                        <h3 className="cart-item-title">{item.product.title}</h3>
                        </Link>

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

                      <p className="cart-item-price">
                        Price: {item.product.price * item.quantity}
                      </p>

                      <button
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="price-div">
                  <h4 className="cart-total-price">Total Price: {totalPrice}</h4>

                  <div className="order-buttons-container">
                    <button className="cart-clear" onClick={() => clearCart()}>
                      Clear Cart
                    </button>
                    <button className="order-button" onClick={() => placeOrder()}>
                      Order now
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="cart-empty">Your cart is empty.</p>
            )}
          </div>
      )}
    </>
  );
};

export default Cart;
