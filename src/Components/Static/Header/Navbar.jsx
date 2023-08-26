import React from "react";
import "./nav.css";

const Navbar = () => {
  return (
    <nav class="menu--right" role="navigation">
      <div class="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul class="menuItem">
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
