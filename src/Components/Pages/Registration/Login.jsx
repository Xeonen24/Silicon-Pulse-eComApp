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
  const [isLogin,setIsLogin] = useState(false);

  const isLoggedIn = localStorage.getItem("loggedIn?");


  useEffect(() => {
    const loginChck = () => {
      if (isLoggedIn === "true") {
        console.log(isLoggedIn);
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    };
  }, []);

  console.log(isLogin)

  useEffect(() => {
    fetchUserDetails();
  },[])

  const goTologin = (e) => {
    window.location.href='/login'
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUserDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ul className="navbar-nav ms-auto">
        {isLogin ? (
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
