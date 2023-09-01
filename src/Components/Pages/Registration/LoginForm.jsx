import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    IsLoggedIn();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  }, [userDetails]);

  const IsLoggedIn = () => {
    const chckLogin = localStorage.getItem("loggedIn?");
    if (chckLogin === "true") {
      setIsLoggedIn(true);
      window.location.href = "/";
    } else {
      setIsLoggedIn(false);
    }
  };


  const handleFormSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_URL + "/auth/login",
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
      localStorage("jwtoken", response.data.token)
      if (response.status === 400) {
        toast.error("Invalid credentials, please try again.", {
          autoClose: 1500,
          position: "top-right",
        });
      } else {
        localStorage.setItem("loggedIn?", true);
        fetchUserDetails();
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 1500);
      }
    } catch (error) {
      setLoading(false)
      toast.error("Invalid credentials", {
        autoClose: 1500,
        position: "top-right",
      });
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL + "/auth/user", {
      withCredentials: true,
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtoken")}`,
        },
      });
      setUserDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <p
            style={{
              textAlign: "center",
              marginTop: "16rem",
              fontSize: "2rem",
            }}
          >
            Already logged in, redirecting....
          </p>
        </>
      ) : loading ? (
        <div className="page-loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
        <div className="wrapperL">
          <div className="fbLoginForm">
            <div className="fbLoginFormContainer">
              <h2 className="fbLoginFormTitle">Login</h2>
              <form className="fbLoginForm" onSubmit={handleFormSubmit}>
                <label className="fbLoginFormLabel">Username</label>
                <input
                  className="fbLoginFormInput"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="fbLoginFormLabel">Password</label>
                <input
                  className="fbLoginFormInput"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="fbLoginBtn" type="submit">
                  Login
                </button>
              </form>
              <hr className="fbLoginDivider" />
              <Link to="/signup" className="fbLoginLink">
                Don't have an account? <span style={{color:'blue'}}>Click here.</span>
              </Link>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default LoginForm;
