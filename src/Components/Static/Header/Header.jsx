import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./header.css";

const Header = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    const storedActiveLink = localStorage.getItem("activeLink");
    if (storedActiveLink) {
      setActiveLink(storedActiveLink);
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleUserDropdown = (e) => {
    if (!e.target.closest(".userDropdown")) {
      setIsDropdownVisible(!isDropdownVisible);
    }
  };
  
  useEffect(() => {
    setActiveLink(location.pathname);
    localStorage.setItem("activeLink", location.pathname);
  }, [location]);

  return (
    <div>
      <div className="header">
        <nav>
          <ul id="nav3">
            <Link to="/">
              <li className="logoTitle">logoplaceholder</li>
            </Link>
          </ul>
          <ul id="nav1">
            <Link to="/">
              <li
                className={activeLink === "/" ? "active" : ""}
                onClick={() => setActiveLink("/")}
              >
                Home
              </li>
            </Link>
            <li
              className={activeLink === "/product" ? "active" : ""}
              onClick={() => {
                setActiveLink("/product");
                toggleDropdown();
              }}
            >
              Products
              {showDropdown && (
                <div className="dropdown-box">
                  <ul id="dropdownn">
                    <li>Components</li>
                    <ol>
                      <li>Processors</li>
                      <li>RAMs</li>
                      <li>Motherboards</li>
                      <li>Storage Drives</li>
                      <li>Graphic Cards</li>
                      <li>Power supplies</li>
                    </ol>
                  </ul>
                </div>
              )}
            </li>
            <Link to="/about">
              <li
                className={activeLink === "/about" ? "active" : ""}
                onClick={() => setActiveLink("/about")}
              >
                About
              </li>
            </Link>
            <Link to="/contact">
              <li
                className={activeLink === "/contact" ? "active" : ""}
                onClick={() => setActiveLink("/contact")}
              >
                Contact
              </li>
            </Link>
          </ul>
          <ul id="nav2">
            <li onClick={toggleUserDropdown}>
              <FontAwesomeIcon
                icon={faUser}
                style={{
                  color: "white",
                  fontSize: "24px",
                  marginTop: "24px",
                  marginRight: "20px",
                }}
              />
              {isDropdownVisible && (
                <div className="userDropdown">
                  <form className="loginForm">
                    <label>Username</label>
                    <input type="text" name="username"></input>
                    <label>Password</label>
                    <input type="text" name="password"></input>
                    <button className="login_btn" type="submit">Login</button>
                  </form>
                  <hr className="loginhr"/>
                  <h5 className="loginh5"><Link to="/signup">Don't have account?<br/>
                    Click here.</Link>
                  </h5>
                </div>
              )}
            </li>
            <li>
              <Link>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{
                    color: "white",
                    fontSize: "24px",
                    marginTop: "24px",
                  }}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Header;
