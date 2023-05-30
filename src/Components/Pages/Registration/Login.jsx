import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./login.css";

const Login = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
		  const response = await axios.post('http://localhost:5000/api/login', {
			username,
			password
		  }, {
			withCredentials: true,
			headers: {
			  'Content-Type': 'application/json'
			}
		  });
		  if (response.status === 400) {
			window.alert('Invalid credentials');
		  } else {
			window.alert('Login successful');
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
      <ul id="nav2">
        <li onClick={toggleUserDropdown}>
          <FontAwesomeIcon
            icon={faUser}
            style={{
              color: "black",
              fontSize: "24px",
              paddingLeft: "10px",
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
              <h5 className="loginh5">
                <Link to="/signup">
                  Don't have account?
                  <br />
                  Click here.
                </Link>
              </h5>
            </div>
          )}
        </li>
        <li>
          <Link>
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{
                color: "black",
                fontSize: "24px",
                paddingLeft: "10px",
              }}
            />
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Login;
