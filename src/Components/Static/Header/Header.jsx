import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [activeRoute, setActiveRoute] = useState(null);
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
    <nav className="navbar navbar-expand-lg navbar-white bg-transparent nav-bar-all d-flex">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Silicon Pulse
        </Link>
        <button
          className={`navbar-toggler ${expanded ? "" : "collapsed"}`}
          type="button"
          onClick={toggleNavbar}
          aria-expanded={expanded}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
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
                className={`nav-link ${
                  activeRoute === "/about" ? "active" : ""
                }`}
              >
                About
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <Link
                to="/profile"
                className={`nav-link ${
                  activeRoute === "/profile" ? "active" : ""
                }`}
                onClick={() => setActiveRoute("/profile")}
              >
                <li className="nav-link">
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      color: "black",
                      fontSize: "24px",
                      paddingTop: "5px",
                      paddingLeft: "1px",
                    }}
                  />
                </li>
              </Link>
            ) : (
              <>
                <li
                  className={`nav-link ${
                    activeRoute === "/login" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveRoute("/login");
                    goTologin();
                  }}
                >
                  <li className="nav-link">
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        color: "black",
                        fontSize: "24px",
                        paddingTop: "5px",
                        paddingLeft: "1px",
                      }}
                    />
                  </li>
                </li>
              </>
            )}
            <li className="nav-link">
              <Link
                to="/cart"
                className={`nav-link ${
                  activeRoute === "/cart" ? "active" : ""
                }`}
                onClick={() => setActiveRoute("/cart")}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{
                    color: "black",
                    fontSize: "24px",
                    paddingLeft: "1px",
                    paddingTop: "5px",
                    marginLeft: "1px",
                  }}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
