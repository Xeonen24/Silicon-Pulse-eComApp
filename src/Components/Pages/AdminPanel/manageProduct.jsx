import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./manageProduct.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProduct = () => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    productCode: "",
    title: "",
    description: "",
    category: "",
    available: "",
    imagePath: "",
    manufacturer: "",
    discountprice: "",
    price: "",
  });
  const [roleDetails, setRoleDetails] = useState("");

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories", {
        autoClose: 1500,
        position: "top-right",
      });
      console.error("Error fetching categories:", error);
    }
  };

  const postData = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/add-product",
        data
      );
      setData({});
      toast.success("Product Added Successfully", {
        autoClose: 2000,
        position: "top-right",
      });
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed To Add Product", {
        autoClose: 2000,
        position: "top-right",
      });
      console.error("Error fetching categories and products:", error);
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
    getCategories();
    fetchRoleDetails();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    postData();
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
              onChange={(e) =>
                setData({ ...data, productCode: e.target.value })
              }
            />
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
            />
            <label>Category</label>
            <div className="custom-dropdown-container">
              <select
                className="custom-dropdown-select"
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <label>Available</label>
            <input
              type="text"
              name="available"
              value={data.available}
              onChange={(e) => setData({ ...data, available: e.target.value })}
            />
            <label>Image Path</label>
            <input
              type="text"
              name="imagePath"
              value={data.imagePath}
              onChange={(e) => setData({ ...data, imagePath: e.target.value })}
            />
            <label>Discount Price</label>
            <input
              type="text"
              name="discountprice"
              value={data.discountprice}
              onChange={(e) =>
                setData({ ...data, discountprice: e.target.value })
              }
            />
            <label>Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              value={data.manufacturer}
              onChange={(e) =>
                setData({ ...data, manufacturer: e.target.value })
              }
            />
            <button className="signupbutton" type="submit">
              Register
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>You are Not Aurthorized</p>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
