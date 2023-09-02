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

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        process.env.REACT_APP_URL + "/auth/user",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        setUserDetails(response.data);
        localStorage.setItem("loggedIn?", true);
      } else {
        console.error(response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/auth/login`,
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
      if (response.status === 200) {
        const jwtToken = response.headers["authorization"].replace('Bearer ', '');
        console.log("Authorization Header:", jwtToken);

        localStorage.setItem("jwtToken", jwtToken);

        await fetchUserDetails();
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        toast.error("Invalid credentials, please try again.", {
          autoClose: 1500,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again later.", {
        autoClose: 1500,
        position: "top-right",
      });
    } finally {
      setLoading(false);
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
                  Don't have an account?{" "}
                  <span style={{ color: "blue" }}>Click here.</span>
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
