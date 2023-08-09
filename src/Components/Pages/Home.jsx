import React ,{useEffect}from "react";
import image from "../../Images/hs.png";
import "./home.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });;
    } catch (error) {
      console.error(error);
        localStorage.setItem("userDetails",null);
        localStorage.setItem("loggedIn?",false);
    }
  };

  return (
    <div className="main_div">
      <h1 className="main_name">Silicon Pulses </h1>
      <p className="subhead_name">The Ultimate Gaming Hardware Empssorium.</p>
      <Link to="product">
        <Link className="product-link">
          <h4 className="home_btn" spellCheck="false">
            Shop Now
          </h4>
        </Link>
      </Link>
      <img className="img_main" src={image} alt="" />
    </div>
  );
};
export default Home;
