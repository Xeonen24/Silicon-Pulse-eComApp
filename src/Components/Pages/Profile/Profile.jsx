import React, { useEffect, useState } from "react";
import axios from "axios";
import userLogo from "../../../Images/user.png";
import { Link } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [newusername, setUsername] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("userDetails");

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);

      const createdAt = parsedUserData.createdAt;
      const date = new Date(createdAt);
      const formattedDate = date.toLocaleDateString("en-GB");
      setFormattedDate(formattedDate);
    }
  }, []);

  const handleEditProfile = () => {
    setEditMode(true);
    setUsername(user.username);
  };

  const handleSaveProfile = () => {
    const updatedProfile = {
      newusername,
      previousPassword,
      newPassword,
    };

    axios
      .post("http://localhost:5000/api/update-profile", updatedProfile, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setEditMode(false);
        setPreviousPassword("");
        setNewPassword("");

        window.alert("Profile updated successfully. Please re-login.");
        setTimeout(() => {
          logoutUser();
        }, 3000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          window.alert(error.response.data.error);
        } else {
          console.error("Error updating profile:", error);
        }
      });
  };

  const logoutUser = async () => {
    try {
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
      localStorage.removeItem("userDetails");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setUsername(user.newusername);
    setPreviousPassword("");
    setNewPassword("");
  };

  if (!user) {
    return <div>Redirecting...</div>;
  }

  return (
    <div style={{marginTop:'10rem'}}>
      <div className="profile">
        <div className="sidenav">
          <div className="profile">
            <img src={userLogo} alt="" width="80px" height="80px" />
          </div>
          <div className="name">{user.username}</div>
          <div className="sidenav-url">
            <div className="url">
              <Link to="/profile" className="active">
                Profile
              </Link>
            </div>
            <div className="url">
              <a href="#settings">Settings</a>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="card">
            <h2 className="mainh2">IDENTITY</h2>
            <div className="card-body">
              <i className="fa fa-pen fa-xs edit"></i>
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>:</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <td>Mobile</td>
                    <td>:</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>:</td>
                    <td>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
