import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Static/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Rating } from "@mui/material";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import cabinetImage from "../../Images/cabinet.jpg";
import motherboardImage from "../../Images/motherboard.webp"
import cpuImage from "../../Images/cpu.jpg";
import gpuImage from "../../Images/gpu.jpg";
import keymouseImage from "../../Images/keymouse.jpg";
import powerImage from "../../Images/power.jpg";
import ramImage from "../../Images/ram.jpg";
import coolingImage from "../../Images/cooling.jpg";
import storageImage from "../../Images/storage.jpg";
import exploreImage from "../../Images/explore.png";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [discountedProducts, setDiscountedProducts] = useState();

  useEffect(() => {
    checkLogin();
    getDiscountedProducts();
    getCategories();
    localStorage.removeItem("category");
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "/products/categories",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkLogin = async () => {
    setTimeout(async () => {
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
      } catch (error) {
        console.error(error);
        localStorage.setItem("userDetails", null);
        localStorage.setItem("loggedIn?", false);
      }
    }, 1000);
  };

  const getDiscountedProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "/products/discounted-product",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDiscountedProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="main_div">
      {loading ? (
        <div className="page-loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="carousal-div">
            <h1 className="disc-head">Featured Discounts ...</h1>

            <Swiper
              modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              navigation
              watchSlidesProgress
              speed={1000}
              pagination={{
                clickable: true,
              }}
            >
              {discountedProducts?.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="eachDiv">
                    <div className="imageparent">
                      <img
                        src={`${product.imagePath}`}
                        className="carosalImg"
                      />
                    </div>

                    <div className="carosalText">
                      <p className="p-Title">{product.title}</p>
                      <Rating
                        readOnly
                        name="half-rating-read"
                        value={`${product.ratingAndReviews[0]?.rating}`}
                        precision={0.5}
                        className="review-rating"
                      />
                      <p className="p-Desc">{product.description}</p>
                      <p className="p-Price">{product.price}₹</p>
                      <p className="p-Disc">{product.discountprice}₹</p>
                      <Link to={`/product/${product._id}`}>
                        <div className="custom-btn btn-15">Shop</div>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}

      <div className="category-section">
        <h2 className="section-heading">Popular Product Categories</h2>
        <div className="category-grid">
          {categories.map((category) => (
           <Link to="/product" onClick={() => localStorage.setItem("category" , category._id)} className="category-card-link" key={category._id}>
              <div className="category-card">
                <img
                  src={getImageForCategory(category.title)}
                  alt={category.name}
                  className="category-image"
                />
                <h3 className="category-title">{category.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="benefits-section">
        <h2>Why Choose Our Computer Products?</h2>
        <div className="benefit-card">
          <div className="benefit-icon">
            <i className="fas fa-shipping-fast"></i>
          </div>
          <div className="benefit-text">
            <h3>Fast Shipping</h3>
            <p>
              Get your computer products delivered quickly and reliably to your
              doorstep.
            </p>
          </div>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="benefit-text">
            <h3>Quality Assurance</h3>
            <p>
              We ensure that all our products are of high quality and undergo
              rigorous testing.
            </p>
          </div>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <div className="benefit-text">
            <h3>Great Deals</h3>
            <p>
              Enjoy exclusive discounts on a wide range of computer products.
            </p>
          </div>
        </div>
      </div>

      <div className="Footer-div">
        <Footer />
      </div>
    </div>
  );
};

const getImageForCategory = (categoryTitle) => {
  switch (categoryTitle) {
    case "Cases/Cabinets":
      return cabinetImage;
    case "Processors":
      return cpuImage;
    case "Graphics Cards":
      return gpuImage;
    case "Peripherals":
      return keymouseImage;
    case "Power Supplies":
      return powerImage;
    case "RAMs":
      return ramImage;
    case "Cooling Solutions":
      return coolingImage;
    case "Storage Devices":
      return storageImage;
    case "Motherboards":
      return motherboardImage;
    default:
      return exploreImage;
  }
};

export default Home;
