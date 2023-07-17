<<<<<<< Updated upstream
import React, { useState, useEffect } from "react";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Item Added to cart", {
          autoClose: 2000,
          position: "top-right",
        });
      })
      .catch((error) => console.log(error));
=======
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
>>>>>>> Stashed changes
  };

  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove-all`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
        },
      });
      setCartItems([]);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
<<<<<<< Updated upstream
    <>
      <div>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {currentProducts.map((product, index) => (
          <div className="grid-item" key={index}>
            <Link to={`/product/${product._id}`} className="product-link">
=======
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.product._id}>
>>>>>>> Stashed changes
              <img
                src={item.product.imagePath}
                alt={item.product.title}
                className="item-image"
              />
<<<<<<< Updated upstream
              <h3 className="item-title">{product.title}</h3>
              <p className="item-dcprices">
                {product.discountprice !== 0
                  ? `₹ ${product.discountprice}`
                  : ""}
              </p>
              <p className="item-prices">
                {product.discountprice !== 0
                  ? `₹ ${product.price}`
                  : `₹ ${product.price}`}
              </p>
              <h4 style={{ color: product.quantity > 0 ? "green" : "red" }}>
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </h4>
            </Link>
            <button
              className={product.quantity > 0? "item-add-to-cart":"item-out-of-stock"}
              disabled={!product.quantity}
              onClick={() => addToCart(product._id)}
              style={{
                backgroundColor: product.quantity ? "" : "#a6a6a6",
              }}
            >
              <FontAwesomeIcon
                icon={faCartPlus}
                style={{ fontSize: "23px", paddingLeft: "0px" }}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from(
          Array(Math.ceil(filteredProducts.length / productsPerPage)),
          (item, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </>
=======
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
          ))}
          <button className="cart-clear" onClick={() => clearCart()}>
            Clear Cart
          </button>
          <button className="order-button">Order now</button>
        </>
      ) : (
        <p className="cart-empty">Your cart is empty.</p>
      )}
    </div>
>>>>>>> Stashed changes
  );
};

export default Cart;