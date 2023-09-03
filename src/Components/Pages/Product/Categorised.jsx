import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CategoryProducts() {
  const { categoryId } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    axios.get(`/category/${categoryId}`)
      .then(response => {
        setCategoryProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching category products:', error);
      });
  }, [categoryId]);

  return (
    <div>
      <h2>Products in this Category</h2>
      <div className="product-list">
        {categoryProducts.map(product => (
          <div key={product._id} className="product-card">
            {/* Display product information */}
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-title">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;
