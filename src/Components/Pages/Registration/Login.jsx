import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import AccountDropdown from "../Profile/AccountDropdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    IsLoggedIn();
  },[])

  const IsLoggedIn = () => {
    const chckLogin = localStorage.getItem('loggedIn?');
    if (chckLogin === 'true') {
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false)
      localStorage.setItem("userDetails","")
    }
  };

  const goTologin = (e) => {
    window.location.href='/login'
  };

  return (
    <>
      <ul className="navbar-nav ms-auto">
        {isLoggedIn ? (
          <AccountDropdown userDetails={userDetails} />
        ):(
          <>
          <li className="nav-link" onClick={goTologin}>
            <FontAwesomeIcon
              icon={faUser}
              style={{
                color: "black",
                fontSize: "24px",
                paddingTop: "5px",
                paddingLeft: "1px",
              }}
            />
          </li>
        </>
        )}
        <li className="nav-link">
          <Link to="/cart">
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
