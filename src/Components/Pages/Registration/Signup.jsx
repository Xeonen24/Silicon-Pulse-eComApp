import React, { useState, useEffect } from "react";
import axios from "axios";
import "./signup.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    IsLoggedIn();
  }, []);

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
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(process.env.REACT_APP_URL + "/auth/signup",
        {
          username,
          email,
          password,
          password2,
        },
        config
      );
      console.log(response.data);
      setUsername("");
      setEmail("");
      setPassword("");
      setPassword2("");
      toast.success("Registration complete, proceed to login.", {
        autoClose: 1500,
        position: "top-right",
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(
          error.response.data.error ||
            error.response.data ||
            error.response ||
            error,
          {
            autoClose: 1500,
            position: "top-right",
          }
        );
      } else {
        console.error("Error updating profile:", error);
      }
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
      ) : (
        <div className="wrapperL">
          <div className="signup-box">
          <form className="signup-form" onSubmit={handleFormSubmit}>
            <h2 className="fbLoginFormTitle">Register</h2>
            <label>Username</label>
            <input
              className="signup-input"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              className="signup-input"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              className="signup-input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Re-enter Password</label>
            <input
              className="signup-input"
              type="password"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <button className="signup-button" type="submit">
              Register
            </button>
            <hr className="fbLoginDivider" />
            <Link to="/login" className="fbLoginLink">
              Already have an account? <span style={{color:'blue'}}>Click here.</span>
            </Link>
          </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
