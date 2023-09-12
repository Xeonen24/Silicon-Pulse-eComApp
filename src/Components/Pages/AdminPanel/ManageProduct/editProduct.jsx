import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./addProduct.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = ({ productId }) => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    quantity: "",
    manufacturer: "",
    discountprice: "",
    price: "",
  });
  const [roleDetails, setRoleDetails] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const getProduct = async () => {
    try {
      if (id) {
        const response = await axios.get(
          process.env.REACT_APP_URL + `/products/products/${id}`
        );
        setData(response.data);
      } else {
        const response = await axios.get(
          process.env.REACT_APP_URL + `/products/products/${productId}`
        );
        setData(response.data);
      }
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
      const response = await axios.get(
        process.env.REACT_APP_URL + "/products/categories"
      );
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
      const token = localStorage.getItem("jwtToken")
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("quantity", data.quantity);
      formData.append("manufacturer", data.manufacturer);
      formData.append("discountprice", data.discountprice);
      formData.append("price", data.price);
      formData.append("image", imageFile);
      if (id) {
        const res = await axios.put(
          process.env.REACT_APP_URL + `/admin/update-product/${id}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        );
      } else {
        const res = await axios.put(
          process.env.REACT_APP_URL + `/admin/update-product/${productId}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        );
      }
      setData({});
      setImageFile(null);
      setPreviewSource(null);
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
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        process.env.REACT_APP_URL + "/auth/user",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  const handleInputChange = (e) => {
    if (e.target.name === "imagePath") {
      const newImagePath = e.target.value;
      setData({ ...data, imagePath: newImagePath });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      {roleDetails.role === "admin" ? (
        <div className="add-product-box">
          <form className="add-product-form" onSubmit={handleFormSubmit}>
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
                <option>Select Category</option>
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
            {previewSource ? (
              <img src={previewSource} style={{maxWidth:'200px'}} alt="Product Image" className="w-100" />
            ):(
              <img src={data.imagePath} style={{maxWidth:'200px'}} alt="Product Image" className="w-100" />
            )}
            {data.imagePath && (
              <input
              type="text"
              value={data.imagePath}
            />
            )}
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/png, image/gif, image/jpeg"
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
        <div>Loading please wait...</div>
      )}
    </div>
  );
};

export default EditProduct;
