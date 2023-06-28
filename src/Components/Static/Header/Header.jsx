import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faAmbulance } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
          <li className="nav-item nav-comp">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
            <li
              className={`nav-item nav-comp dropdown ${dropdownOpen ? "show" : ""}`}
            >
              <a
                className="nav-link dropdown-toggle"
                href="#"
                onClick={toggleDropdown}
              >
                Products
              </a>
              <div
                className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                style={{
                  maxHeight: dropdownOpen ? "500px" : "0",
                  opacity: dropdownOpen ? "1" : "0",
                }}
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li className="nav-item nav-comp">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="signup" className="nav-link" style={{ color: "#363636", paddingTop: "6px" }}>
                <FontAwesomeIcon icon={faUser} style={{ fontSize: "25px" }} />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="signup" className="nav-link" style={{ color: "#363636", paddingTop: "6px"  }}>
                <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: "25px" }} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
