import React, { useState, useEffect } from "react";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:5000/api/categories"),
        axios.get("http://localhost:5000/api/products")
      ])
      .then(
        axios.spread((categoriesResponse, productsResponse) => {
          setCategories(categoriesResponse.data);
          setProducts(productsResponse.data);
          console.log(categoriesResponse);
          console.log(productsResponse);
        })
      )
      .catch((error) => {
        console.error("Error fetching categories and products:", error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addToCart = (productId) => {
    axios
      .post(
        "http://localhost:5000/cart/add",
        {
          productId: productId,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtoken")}`
          }
        }
      )
      .then((response) => {
        console.log(response.data);
        setCartItems([...cartItems, response.data.product]);
      })
      .catch((error) => console.log(error));
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (categories.length === 0) {
    return <p>Loading...</p>;
  }

  return (
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
        {filteredProducts.map((product, index) => (
          <div className="grid-item" key={index}>
            <Link to={`/product/${product._id}`} className="product-link">
              <img
                src={product.imagePath}
                alt={product.title}
                className="item-image"
              />
              <h3 className="item-title">{product.title}</h3>
              <p className="item-dcprices">
                {product.discountprice !== 0 ? `₹ ${product.discountprice}` : ""}
              </p>
              <p className="item-prices">
                {product.discountprice !== 0 ? `₹ ${product.price}` : `₹ ${product.price}`}
              </p>
            </Link>
            <button
              className="item-add-to-cart"
              onClick={() => addToCart(product._id)}
            >
              <FontAwesomeIcon
                icon={faCartPlus}
                style={{ fontSize: "23px", paddingLeft: "0px" }}
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
