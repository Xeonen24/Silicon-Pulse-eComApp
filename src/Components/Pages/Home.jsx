import React, { useState, useEffect } from "react";
import image from "../../Images/hs.png";
import "./home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Static/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y , Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {Rating} from '@mui/material';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';


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
    setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/user", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setLoggedIn(true);
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
        "http://localhost:5000/products/discounted-product",
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

  console.log(discountedProducts);

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
              modules={[Autoplay ,Navigation, Pagination, Scrollbar, A11y]}
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
              {discountedProducts.map((product, index) => (
                <SwiperSlide
                  key={index}
                >
                  <div className="eachDiv">

                    <div className="imageparent">
                      <img src={`${product.imagePath}`} className="carosalImg" />
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
      {/* <div>
        <Footer />
      </div> */}
    </div>
  );
};

export default Home;
