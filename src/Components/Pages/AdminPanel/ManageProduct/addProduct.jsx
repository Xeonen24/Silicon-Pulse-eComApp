import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./addProduct.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);


  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result?.toString() || null);
    };
  };

  const [data, setData] = useState({
    productCode: "",
    title: "",
    description: "",
    category: "",
    quantity: "",
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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("productCode", data.productCode);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("quantity", data.quantity);
      formData.append("manufacturer", data.manufacturer);
      formData.append("discountprice", data.discountprice);
      formData.append("price", data.price);
      formData.append("image", imageFile); // Append the selected image to the formData
  
      const response = await axios.post(
        "http://localhost:5000/api/add-product",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      setData({});
  
      toast.success("Product Added Successfully", {
        autoClose: 2000,
        position: "top-right",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed To Add Product", {
        autoClose: 2000,
        position: "top-right",
      });
      console.error("Error adding product:", error);
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
    setLoading(false)
  }, [roleDetails.role]);

  useEffect(() => {
    getCategories();
    fetchRoleDetails();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <>
      {loading ? (
        <div className="page-loading">
          <div className="spinner"></div>
        </div>
      ) : (
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
                    onChange={(e) =>
                      setData({ ...data, category: e.target.value })
                    }
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
                  onChange={(e) =>
                    setData({ ...data, quantity: e.target.value })
                  }
                />
                <label>Image</label>
                {
                    previewSource && 
                  <img
                  src={previewSource}
                  alt="Add Image"
                  className='w-100'
                  />
                }
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/png, image/gif, image/jpeg"
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
              <p
                style={{
                  textAlign: "center",
                  marginTop: "16rem",
                  fontSize: "2rem",
                }}
              >
                Oh no! Something went wrong! Could not find the page you're
                looking for.
                <br />
                <Link to="/">Click here to return to homepage.</Link>
              </p>{" "}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AddProduct;
