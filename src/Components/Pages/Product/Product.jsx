import React, { useState, useEffect } from "react";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(response => {
        setProducts(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      <div className="grid">
        {products.map((product, index) => (
          <div className="grid-item" key={index}>
            <Link to={`/product/${product._id}`} className="product-link">
              <img src={product.imagePath} alt={product.title} className="item-image" />
              <h3 className="item-title">{product.title}</h3>
              <p className="item-dcprices">
            {product.discountprice !== 0 ? `₹ ${product.discountprice}` : ""}
          </p>
          <p className="item-prices">
            {product.discountprice !== 0
              ? `₹ ${product.price}`
              : `₹ ${product.price}`}
          </p>
            </Link>
            <button className="item-add-to-cart">
                <FontAwesomeIcon icon={faCartPlus} style={{ fontSize: "23px", paddingLeft: "0px" }} />
              </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
