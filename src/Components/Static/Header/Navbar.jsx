import React from "react";
import "./nav.css";

const Navbar = () => {
  return (
    <nav className="menu--right" role="navigation">
      <div className="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul className="menuItem">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Info</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Show me more</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
