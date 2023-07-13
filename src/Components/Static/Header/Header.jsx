import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../../Pages/Registration/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
            <li className="nav-item nav-comp">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li
              className={`nav-item nav-comp dropdown ${dropdownOpen ? "show" : ""}`}
            >
              <Link className="nav-link" to='/product'>
                Products
              </Link>
            </li>
            <li className="nav-item nav-comp">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
          </ul>
          <Login />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
