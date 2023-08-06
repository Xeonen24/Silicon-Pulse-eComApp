import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProduct = () => {
  const [roleDetails, setRoleDetails] = useState({});
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRoleDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user-role", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRoleDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (roleDetails.role === "admin") {
      toast.info("Authorization check complete.", {
        autoClose: 1000,
        position: "top-right",
        toastId: "admin-toast",
      });
    }
  }, [roleDetails.role]);

  const updateProduct = (selectedProduct) => {};

  const deleteProduct = (selectedProduct) => {};

  const renderProductRow = (product) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    };

    if (selectedProduct && selectedProduct._id === product._id) {
      return (
        <tr className="productInfox" key={product._id}>
          <td className="productIdx">{product._id}</td>
          <td className="productCreatedAtx">
            <label type="text">{formatDate(selectedProduct.createdAt)}</label>
          </td>
          <td className="productTitlex">
            <label>{selectedProduct.title}</label>
          </td>
          <td className="productEditx">
          <Link to={`/edit-product/${product._id}`}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Link>
        </td>
          <td className="productDeletex" onClick={closeeditProduct}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </td>
        </tr>
      );
    } else {
      return (
        <tr className="productInfox" key={product._id}>
          <td className="productIdx">{product._id}</td>
          <td className="productCreatedAtx">
            <label type="text">{formatDate(product.createdAt)}</label>
          </td>
          <td className="productIdx">{product.productCode}</td>
          <td className="productIdx">{product.imagePath}</td>
          <td className="productTitlex">{product.title}</td>
          <td className="productEditx" onClick={() => editProduct(product)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </td>
          <td className="productDeletex" onClick={() => deleteProduct(product)}>
            <FontAwesomeIcon icon={faTrash} />
          </td>
        </tr>
      );
    }
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
  };
  const closeeditProduct = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    fetchCategory();
    fetchProducts();
    fetchRoleDetails();
  }, []);

  return (
    <>
      {roleDetails.role === "admin" ? (
        <div>
          <div>
            <Link to="/add-product">
              <button>Add a Product</button>
            </Link>
          </div>
          <div className="product-List">
            <table>
              <thead>
                <tr>
                  <th>PID</th>
                  <th>Created At</th>
                  <th>Product Code</th>
                  <th>Title</th>
                  <th>Image path</th>
                  <th>Edit Product</th>
                  <th>Delete Product</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => renderProductRow(product))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>You're not authorized.</div>
      )}
    </>
  );
};

export default ManageProduct;
