import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./accdrop.css";

const AccountDropdown = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const location = useLocation();

  useEffect(() => {
    fetchUserDetails();
  }, [location]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUserDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  }, [userDetails]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await axios.post(
        "http://localhost:5000/api/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.alert("Logged out successfully");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      localStorage.removeItem("userDetails");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const toggleUserDropdown = (e) => {
    if (!e.target.closest(".userDropdown")) {
      setIsDropdownVisible(!isDropdownVisible);
    }
  };

  return (
    <>
      <li className="nav-link" onClick={toggleUserDropdown}>
        <FontAwesomeIcon
          icon={faUser}
          style={{
            color: "black",
            fontSize: "24px",
            paddingTop: "5px",
            paddingLeft: "1px",
          }}
        />
        {isDropdownVisible && (
          <div className="userDropdown">
            <div className="userDetails">Hi, {userDetails.username}</div>
            <hr className="loginhr1"/>
            <ul className="listulform">
              <li>
              <Link to="/profile" className="listofform">
              My Account
            </Link>
              </li>
              <li>
              <Link to="/profile" className="listofform">
              My Orders
            </Link>
              </li>
            </ul>
            <hr className="loginhr2"/>
            <a className="Buttonss" onClick={handleLogout}>
              {isLoggingOut ? "Logging out..." : "Logout"}
            </a>
          </div>
        )}
      </li>
    </>
  );
};
export default AccountDropdown;
