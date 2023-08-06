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
  const [selectedProduct, setSelectedProduct] = useState(null); // Initialize with null
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Number of products to display per page

  // Fetch products from the API
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

  // Fetch categories from the API
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

  // Fetch role details from the API
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
    fetchCategory();
    fetchProducts();
    fetchRoleDetails();
  }, []);

  // Handle pagination - Get the current products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const updateProduct = (selectedProduct) => {};

  const deleteProduct = (selectedProduct) => {};

  // Render a single product row
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
            <Link to={`/edit-product/${product._id}`}> {/* Add backticks */}
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
            <table className="table-List">
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
                {currentProducts.map((product) => renderProductRow(product))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            {/* Generate pagination links */}
            {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>You're not authorized.</div>
      )}
    </>
  );
};

export default ManageProduct;
