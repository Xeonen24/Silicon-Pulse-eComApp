import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

const Login = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 400) {
        window.alert("Invalid credentials");
      } else {
        window.alert("Login successful");
      }
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
      <ul className="navbar-nav ms-auto">
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
              <form className="loginForm" onSubmit={handleFormSubmit}>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
                <label>Password</label>
                <input
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button className="login_btn" type="submit">
                  Login
                </button>
              </form>
              <hr className="loginhr" />

              <Link to="/signup" className="loginLink" as="h5">
                Don't have an account?
                <br />
                Click here.
              </Link>
            </div>
          )}
        </li>
        <li className="nav-link">
          <Link>
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
    </>
  );
};

export default Login;
