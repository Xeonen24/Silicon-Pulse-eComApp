import React, { useState, useEffect } from "react";
import image from "../../Images/hs.png";
import "./home.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(true); 
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    checkLogin();
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
    },1000);
  };

  return (
    <div className="main_div">
      {loading ? (
        <div className="page-loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <h1 className="main_name">Silicon Pulses</h1>
          <p className="subhead_name">The Ultimate Gaming Hardware Emporium.</p>
          <Link to="product">
            <Link className="product-link">
              <h4 className="home_btn" spellCheck="false">
                Shop Now
              </h4>
            </Link>
          </Link>
          <img className="img_main" src={image} alt="" />
        </>
      )}
    </div>
  );
};

export default Home;
