import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addProduct.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const EditProduct = ({productId}) => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    productCode: "",
    title: "",
    description: "",
    category: "",
    quantity: "",
    imagePath: "",
    manufacturer: "",
    discountprice: "",
    price: "",
  });
  const [roleDetails, setRoleDetails] = useState("");

  const getProduct = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + `/products/products/${productId}`
      );
      setData(response.data);
    } catch (error) {
      toast.error("Failed to fetch product", {
        autoClose: 1500,
        position: "top-right",
      });
      console.error("Error fetching product:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL + "/products/categories");
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories", {
        autoClose: 1500,
        position: "top-right",
      });
      console.error("Error fetching categories:", error);
    }
  };

  const updateProduct = async () => {
    try {
      await axios.put(
        process.env.REACT_APP_URL + `/admin/update-product/${productId}`,
        data
      );
      toast.success("Product updated successfully", {
        autoClose: 2000,
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to update product", {
        autoClose: 2000,
        position: "top-right",
      });
      console.error("Error updating product:", error);
    }
  };

  const fetchRoleDetails = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL + "/admin/user-role", {
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
    getProduct();
    getCategories();
    fetchRoleDetails();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateProduct();
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {roleDetails.role === "admin" ? (
        <div className="add-product-box">
          <form className="add-product-form" onSubmit={handleFormSubmit}>
            <label>Product Code</label>
            <input
              type="text"
              name="productCode"
              value={data.productCode}
              onChange={handleInputChange}
            />
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleInputChange}
            />
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={data.description}
              onChange={handleInputChange}
            />
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={data.price}
              onChange={handleInputChange}
            />
            <label>Discount Price</label>
            <input
              type="text"
              name="discountprice"
              value={data.discountprice}
              onChange={handleInputChange}
            />
            <label>Category</label>
            <div className="custom-dropdown-container">
              <select
                className="custom-dropdown-select"
                name="category"
                value={data.category}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <label>Quantity</label>
            <input
              type="text"
              name="quantity"
              value={data.quantity}
              onChange={handleInputChange}
            />
            <label>Image Path</label>
            <input
              type="text"
              name="imagePath"
              value={data.imagePath}
              onChange={handleInputChange}
            />
            <label>Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              value={data.manufacturer}
              onChange={handleInputChange}
            />
            <button className="signupbutton" type="submit">
              Update Product
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p
            style={{
              textAlign: "center",
              marginTop: "16rem",
              fontSize: "2rem",
            }}
          >
            Oh no! Something went wrong! Could not find the page you're looking
            for.
            <br />
            <Link to="/">Click here to return to homepage.</Link>
          </p>{" "}
        </div>
      )}
    </div>
  );
};

export default EditProduct;
