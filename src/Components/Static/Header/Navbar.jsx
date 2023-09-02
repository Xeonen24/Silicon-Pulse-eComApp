import React, { useState } from "react";
import "./nav.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <nav className="menu--right" role="navigation">
      <div className="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul className="menuItem">
          <li>
            <Link to="/" onClick={handleCheckboxToggle}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/product" onClick={handleCheckboxToggle}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={handleCheckboxToggle}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
