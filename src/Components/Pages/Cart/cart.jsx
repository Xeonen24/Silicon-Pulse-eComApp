import React, { useState, useEffect } from "react";

export const ShopContext = createContext(null);

const defaultCart = () => {
  let cart = {}; // initializing empty object for storing the items in the shopping cart
  for (let i = 1; ; i++) {
    cart[i] = 0;
  }
  return cart;
};

useEffect(() => {
    // Fetch the product data from your database
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        // Count the total number of products
        const count = data.length;
        setTotalProducts(count);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  },[]);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(defaultCart());
  const [totalProducts, setTotalProducts] = useState(0);
  return (
    <ShopContext.Provider value={{ cartItems, totalProducts }}>
      {props.children}
    </ShopContext.Provider>
  );
};
