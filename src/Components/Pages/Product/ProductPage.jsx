import React from 'react';
import './productpg.css';
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const products = [
    { id: 1, title: "Intel Core i7 bate", price: "400$" },
    { id: 2, title: "Product 2", price: "200$" },
    { id: 3, title: "Product 3", price: "300$" },
    // Add more products as needed
  ];
  const product = products.find((product) => product.id === parseInt(id));

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.price}</p>
      {/* Additional product details */}
    </div>
  );
};

export default ProductPage;
