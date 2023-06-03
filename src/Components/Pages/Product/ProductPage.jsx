import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./productpg.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="productcontainer">
      <div className="product-details">
        <div className="product-image">
          <img src={product.imagePath} alt={product.title} />
        </div>
        <div className="product-info">
          <h2>{product.title}</h2>
          <p>Product ID: {product.productCode}</p>
          <h4>Manufacturer: {product.manufacturer}</h4>
          <h4>
            Category: <Link>{product.category}</Link>
          </h4>
          <p>{product.description}</p>
          <h2 className="item-dcprices">
            {product.discountprice !== 0 ? `₹ ${product.discountprice}` : ""}
          </h2>
          <h2 className="item-prices">
            {product.discountprice !== 0
              ? `₹ ${product.price}`
              : `₹ ${product.price}`}
          </h2>
          <h4>{product.available ? "In Stock" : "Out of Stock"}</h4>
          {product.available ? (
            <>
              <button type="button">Add to Cart</button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
