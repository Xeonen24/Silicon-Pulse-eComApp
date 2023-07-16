import React, { useState, useEffect } from "react";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);
  const location = useLocation();

  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:5000/api/categories"),
        axios.get("http://localhost:5000/api/products"),
      ])
      .then(
        axios.spread((categoriesResponse, productsResponse) => {
          setCategories(categoriesResponse.data);
          setProducts(productsResponse.data);
        })
      )
      .catch((error) => {
        console.error("Error fetching categories and products:", error);
      });
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    setSelectedCategory(category || "");
  }, [location.search]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const addToCart = (productId) => {
    axios
      .post(
        "http://localhost:5000/api/cart/add",
        {
          productId: productId,
          quantity: 1,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
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
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        {currentProducts.map((product, index) => (
          <div className="grid-item" key={index}>
            <a href={`/product/${product._id}`} className="product-link">
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
            </a>
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
  );
};

export default Product;
