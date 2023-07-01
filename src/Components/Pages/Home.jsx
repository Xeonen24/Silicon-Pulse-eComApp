import React from "react";
import image from "../../Images/hs.png";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="wrapper">
      <div className="main_div">
        <h1 className="main_name">Silicon Pulses </h1>
        <p className="subhead_name">The Ultimate Gaming Hardware Empssorium.</p>
        <Link className= "shop-now-link" to="product">
            <h4 className="home_btn button-64">
              Shop Now
            </h4>
        </Link>
      </div>
  </div>
  );
};
export default Home;
