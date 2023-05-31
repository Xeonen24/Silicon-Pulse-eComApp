import React from "react";
import { Link } from "react-router-dom";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const Product = () => {
  const products = [
    {
      id: 1,
      title: "Intel Core i7 bate",
      price: "400$",
      image: "../../../Images/intel.jpg"
    },
    {
      id: 2,
      title: "Product 2",
      price: "200$",
      image: "../../../Images/product2.jpg"
    },
    {
      id: 3,
      title: "Product 3",
      price: "300$",
      image: "../../../Images/product3.jpg"
    },
    // Add more products as needed
  ];

  return (
    <>
      <div className="grid">
        {products.map((product) => (
          <div className="grid-item" key={product.id}>
            <img src={product.image} alt={product.title} className="item-image" />
            <h3 className="item-title">{product.title}</h3>
            <p className="item-price">{product.price}</p>
            <Link to={`/product/${product.id}`} className="item-add-to-cart">
              <FontAwesomeIcon icon={faCartPlus} style={{ fontSize: "23px", paddingLeft: "0px" }} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
