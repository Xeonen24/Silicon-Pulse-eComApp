import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import "./header.css";

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    IsLoggedIn();
  }, []);

  const IsLoggedIn = () => {
    const chckLogin = localStorage.getItem("loggedIn?");
    if (chckLogin === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const goTologin = (e) => {
    window.location.href = "/login";
  };

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="wrapper">

    <div className="container">
        <Link className="Silicon-heading" onClick={() => setActiveRoute("/")} to="/">
          Silicon Pulse
        </Link>
      <div className="headers">
      
        <ul className="navbar-nav">
          <li className={`nav-item nav-comp`}>
            <Link
              to="/"
              onClick={() => setActiveRoute("/")}
              style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
              className={`nav-link ${activeRoute === "/" ? "active" : ""}`}
            >
              Home
            </Link>
          </li>
          <li className={`nav-item nav-comp`}>
            <Link
              to="/product"
              onClick={() => setActiveRoute("/product")}
              style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
              className={`nav-link ${
                activeRoute === "/product" ? "active" : ""
              }`}
            >
              Products
            </Link>
          </li>
          <li className={`nav-item nav-comp`}>
            <Link
              to="/about"
              onClick={() => setActiveRoute("/about")}
              style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
              className={`nav-link ${activeRoute === "/about" ? "active" : ""}`}
            >
              About
            </Link>
          </li>
        </ul>
        <div className="nav-right">
          <Link
            style={{ cursor: "pointer" }}
            to="/profile"
            className={`nav-links ${
              activeRoute === "/profile" ? "active" : ""
            }`}
            onClick={() => setActiveRoute("/profile")}
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{
                color: "black",
                fontSize: "24px",
                paddingTop: "25px",
                paddingLeft: "1px",
              }}
            />
          </Link>
          <Link
            to="/cart"
            style={{ marginRight: "0.6rem" }}
            className={`nav-links ${activeRoute === "/cart" ? "active" : ""}`}
            onClick={() => setActiveRoute("/cart")}
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{
                color: "black",
                fontSize: "24px",
                paddingTop: "25px",
                marginLeft: "1px",
              }}
            />
          </Link>
          <Navbar />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Header;
