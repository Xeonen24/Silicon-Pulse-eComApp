import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPenToSquare,faTrash,} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./editProduct";
import AddProduct from "./addProduct";

const ManageProduct = () => {
  const [roleDetails, setRoleDetails] = useState({});
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [showProducts, setShowProducts] = useState(true);
  const [editProduct, setEditProduct] = useState(false);
  const [addProduct, setaddProduct] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products/products", {
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

  const fetchRoleDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/admin/user-role", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRoleDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchRoleDetails();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/delete-product/${productId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product deleted successfully.");
        fetchProducts();
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the product.");
    }
  };

  const renderProductRow = (product) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    };

    if (product._id) {
      return (
        <tr className="productInfox" key={product._id}>
          <td className="productIdx">{product._id.slice(20, 25)}</td>
          <td className="productCreatedAtx">
            <label type="text">{formatDate(product.createdAt)}</label>
          </td>
          <td className="productIdx">{product.productCode}</td>
          <td className="productTitlex">{product.title}</td>
          <td className="productEditx">
            <Link onClick={() => showEditProduct(product._id)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link>
          </td>
          <td className="productDeletex">
            <Link onClick={() => deleteProduct(product._id)}>
              <FontAwesomeIcon icon={faTrash} />
            </Link>
          </td>
        </tr>
      );
    }
  };

  const showOnlyProducts = async () => {
    setaddProduct(false);
    setEditProduct(false);
    setShowProducts(true);
  };

  const showEditProduct = async (productId) => {
    setSelectedProductId(productId);
    setaddProduct(false);
    setShowProducts(false);
    setEditProduct(true);
  };

  const showAddProduct = async () => {
    setEditProduct(false);
    setShowProducts(false);
    setaddProduct(true);
  };

  return (
    <>
      {isLoading ? (
        <p
          style={{ textAlign: "center", marginTop: "16rem", fontSize: "2rem" }}
        >
          Loading please wait...
        </p>
      ) : roleDetails.role === "admin" ? (
        <div>
          {showProducts&&(
            <>
            <div>
            <Link onClick={showAddProduct}>
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
            {Array.from({
              length: Math.ceil(products.length / productsPerPage),
            }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
            </>
          )}
          {editProduct && (
            <>
              <button onClick={showOnlyProducts}>Go back</button>
            <EditProduct productId={selectedProductId}/>
            </>
          )}
          {addProduct && (
            <>
            <button onClick={showOnlyProducts}>Go back</button>
            <AddProduct productId={selectedProductId}/>
            </>
          )}
        </div>
      ) : (
        <p
          style={{ textAlign: "center", marginTop: "16rem", fontSize: "2rem" }}
        >
          Oh no! Something went wrong! Could not find the page you're looking
          for.
          <br />
          <Link to="/">Click here to return to homepage.</Link>
        </p>
      )}
    </>
  );
};

export default ManageProduct;
