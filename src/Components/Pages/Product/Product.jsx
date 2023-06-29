import React, { useState, useEffect } from "react";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === category
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <div className="categories">
        <button
          className={selectedCategory === "all" ? "active" : ""}
          onClick={() => handleCategoryChange("all")}
        >
          All
        </button>
        <button
          className={selectedCategory === "Processors" ? "active" : ""}
          onClick={() => handleCategoryChange("Processors")}
        >
          CPU
        </button>
        <button
          className={selectedCategory === "gpu" ? "active" : ""}
          onClick={() => handleCategoryChange("gpu")}
        >
          GPU
        </button>
        <button
          className={selectedCategory === "case" ? "active" : ""}
          onClick={() => handleCategoryChange("case")}
        >
          Case
        </button>
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
                {product.discountprice !== 0
                  ? `₹ ${product.price}`
                  : `₹ ${product.price}`}
              </p>
            </Link>
            <button className="item-add-to-cart">
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
