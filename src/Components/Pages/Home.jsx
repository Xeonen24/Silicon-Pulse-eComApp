import React, { useState, useEffect } from "react";
import image from "../../Images/hs.png";
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
import cabinet from "../../Images/cabinet.jpg";
import cpu from "../../Images/cpu.jpg";
import gpu from "../../Images/gpu.jpg";
import keymouse from "../../Images/keymouse.jpg";
import power from "../../Images/power.jpg";
import ram from "../../Images/ram.jpg";
import cooling from "../../Images/cooling.jpg";
import storage from "../../Images/storage.jpg";
import explore from "../../Images/explore.png";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [discountedProducts, setDiscountedProducts] = useState();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    checkLogin();
    getDiscountedProducts();
  }, []);

  const checkLogin = async () => {
    setLoggedIn(true);
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
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
                delay: 800,
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

      {/* ADD HERE */}
      <div className="category-section">
        <h2 className="section-heading">Popular Product Categories</h2>
        <div className="category-grid">
          <Link to="/product" className="category-card-link">
            <div className="category-card">
              <img src={cabinet} alt="Cabinet" className="category-image" />
              <h3 className="category-title">Cabinets</h3>
            </div>
          </Link>
          <Link to="/product" className="category-card-link">
            <div className="category-card">
              <img src={cpu} alt="CPU" className="category-image" />
              <h3 className="category-title">CPU</h3>
            </div>
          </Link>
          <Link to="/product" className="category-card-link">
            <div className="category-card">
              <img src={gpu} alt="GPU" className="category-image" />
              <h3 className="category-title">GPU</h3>
            </div>
          </Link>
          <Link to="/product" className="category-card-link">
            <div className="category-card">
              <img
                src={keymouse}
                alt="Keyboard and Mouse"
                className="category-image"
              />
              <h3 className="category-title">Keyboard & Mouse</h3>
            </div>
          </Link>
          <Link to="/product" className="category-card-link">
            <div className="category-card">
              <img src={power} alt="Power Supply" className="category-image" />
              <h3 className="category-title">Power Supply</h3>
            </div>
          </Link>
          <Link to="/product" className="category-card-link">
            <div className="category-card">
              <img src={ram} alt="RAM" className="category-image" />
              <h3 className="category-title">RAM</h3>
            </div>
          </Link>
          <Link to="/product" className="category-card-link">
            <div className="category-card">
              <img src={cooling} alt="Cooling" className="category-image" />
              <h3 className="category-title">Cooling</h3>
            </div>
          </Link>
          <Link to="/product" className="category-card-link">
            <div className="category-card">
              <img src={storage} alt="Storage" className="category-image" />
              <h3 className="category-title">Storage</h3>
            </div>
          </Link>
          <Link to="/product" className="category-card-link">
            <div className="category-card">
              <img src={explore} alt="Explore" className="category-image" />
              <h3 className="category-title" style={{ fontSize: "2rem" }}>
                Explore more..
              </h3>
            </div>
          </Link>
        </div>
      </div>

      {/* ADD HERE */}
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
      {/* END OF ADD HERE */}

      <div className="Footer-div">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
