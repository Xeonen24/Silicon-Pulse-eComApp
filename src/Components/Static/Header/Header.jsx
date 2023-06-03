import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    <nav className="navbar navbar-expand-lg navbar-white bg-white nav-bar-all">
      <a className="navbar-brand" href="#">
        Navbar Placeholder
      </a>
      <button
        className={`navbar-toggler ${expanded ? "" : "collapsed"}`}
        type="button"
        onClick={toggleNavbar}
        aria-expanded={expanded}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item nav-homya nav-comp">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li
            className={`nav-item dropdown nav-comp ${
              dropdownOpen ? "show" : ""
            }`}
          >
            <a
              className="nav-link dropdown-toggle nav-comp nav-drops"
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
            <a className="nav-link " href="#">
              About
            </a>
          </li>
          <li className="nav-item nav-comp nav-p">
            <a className="nav-link" href="#">
              Pricing
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
