import React, { useEffect, useState } from "react";
import axios from "axios";
import userLogo from "../../../Images/user.png";
import { Link } from "react-router-dom";
import "./profile.css";
import {
  faEdit,
  faPaperPlane,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileContent = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [settingsEditMode, setSettingsEditMode] = useState(false);
  const [newusername, setNewUsername] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userDetails"));
    if (userData && userData.username) {
      setUser(userData);
      setNewUsername(userData.username);
      setNewAddress(userData.address);
      setNewMobile(userData.mobile);
      setNewCountry(userData.country);
    }
  }, []);

  const handleEditProfile = () => {
    setEditMode(true);
    setSettingsEditMode(true);
    setNewUsername(user.username);
    setNewAddress(user.address || "");
    setNewMobile(user.mobile || "");
    setNewCountry(user.country || "");
  };

  const handleSaveProfile = () => {
    const updatedProfile = {
      username: newusername,
      //   address: newAddress,
      //   mobile: newMobile,
      //   country: newCountry,
      previousPassword,
      newPassword,
    };
    try {
      axios.post("http://localhost:5000/api/update-profile", updatedProfile, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setEditMode(false);
      setSettingsEditMode(false);
      setPreviousPassword("");
      setNewPassword("");

      toast.success("Logged out, redirecting...", {
        autoClose: 1500,
        position: "top-right",
      });
      setTimeout(() => {
        logoutUser();
      },2000)
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        window.alert(error.response.data.error);
      } else {
        console.error("Error updating profile:", error);
      }
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(
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
      localStorage.setItem("loggedIn?", false);
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="profile">
        <div className="sidenav">
          <div className="sidenavborder">
            <div className="profile">
              <img src={userLogo} alt="" width="80px" height="80px" />
            </div>
            <div className="name">{user.username}</div>
            <div className="sidenav-url">
              <div className="url">
                <Link to="/profile" className="url active">
                  Profile
                </Link>
              </div>
              <div className="url">
                <Link onClick={logoutUser}>Logout</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="card">
            <FontAwesomeIcon
              style={{
                fontSize: "1.8rem",
                marginLeft: "17rem",
                marginTop: "1rem",
              }}
              onClick={() => setSettingsEditMode(!settingsEditMode)}
              icon={settingsEditMode ? faClose : faEdit}
            />
            <h2 className="mainh2">IDENTITY</h2>
            <div className="card-body">
              {!editMode ? (
                <i
                  className="fa fa-pen fa-xs edit"
                  onClick={handleEditProfile}
                ></i>
              ) : (
                <></>
              )}
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>
                      {settingsEditMode ? (
                        <input
                          type="text"
                          value={newusername}
                          onChange={(e) => setNewUsername(e.target.value)}
                        />
                      ) : (
                        <input type="text" value={user.username} disabled />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>
                      <input type="text" value={user.email} disabled />
                    </td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>:</td>
                    <td>
                      {settingsEditMode ? (
                        <input
                          type="text"
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                        />
                      ) : (
                        <input type="text" value={newAddress || ""} disabled />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Mobile</td>
                    <td>:</td>
                    <td>
                      {settingsEditMode ? (
                        <input
                          type="text"
                          value={newMobile}
                          onChange={(e) => setNewMobile(e.target.value)}
                        />
                      ) : (
                        <input type="text" value={newMobile || ""} disabled />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>:</td>
                    <td>
                      {settingsEditMode ? (
                        <input
                          type="text"
                          value={newCountry}
                          onChange={(e) => setNewCountry(e.target.value)}
                        />
                      ) : (
                        <input type="text" value={newCountry || ""} disabled />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Previous Password</td>
                    <td>:</td>
                    <td>
                      {settingsEditMode ? (
                        <input
                          type="password"
                          value={previousPassword}
                          onChange={(e) => setPreviousPassword(e.target.value)}
                        />
                      ) : (
                        <input type="password" value="**********" disabled />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>New Password</td>
                    <td>:</td>
                    <td>
                      {settingsEditMode ? (
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      ) : (
                        <input type="password" value="**********" disabled />
                      )}
                    </td>
                  </tr>
                </tbody>
                {settingsEditMode ? (
                  <button
                    style={{ width: "100", margin: "1rem" }}
                    className="buttonsoforder"
                    onClick={handleSaveProfile}
                  >
                    Submit &nbsp;&nbsp;
                    <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                  </button>
                ) : (
                  <>
                    <button
                      style={{ width: "100", margin: "1rem" }}
                      className="buttonsoforder"
                      disabled
                    >
                      Submit &nbsp;&nbsp;
                      <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                    </button>
                  </>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
