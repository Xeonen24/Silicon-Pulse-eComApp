import React, { useState } from "react";
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/signup",
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
      toast.success("Registration complete, proceed to login." , {
        autoClose: 1500,
        position: "top-right",
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error || error.response.data || error.response || error , {
          autoClose: 1500,
          position: "top-right",
        });
      } else {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <div className="signup-box">
      <form className="signup-form" onSubmit={handleFormSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Re-enter Password</label>
        <input
          type="text"
          name="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button className="signupbutton" type="submit">
          Register
        </button>
      </form>
      <div className="login-box">
        <h3 className="logintitle">Already have an account?</h3>
        <Link to="/login">
          <span className="loginbutton" type="submit">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
