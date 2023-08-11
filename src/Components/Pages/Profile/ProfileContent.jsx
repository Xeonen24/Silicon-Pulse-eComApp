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
import ManageProduct from "../AdminPanel/ManageProduct/manageProduct";
import ManageUser from "../AdminPanel/ManageUser/manageUser";

const ProfileContent = () => {
  const [user, setUser] = useState({});
  const [settingsEditMode, setSettingsEditMode] = useState(false);
  const [newusername, setNewUsername] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [roleDetails, setRoleDetails] = useState("");
  const [showProfileCont, setshowProfileCont] = useState(false);
  const [showManageProds, setshowManageProds] = useState(false);
  const [showManageuser, setshowManageuser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoleDetails();
    setshowProfileCont(true);
    const userData = JSON.parse(localStorage.getItem("userDetails"));
    if (userData?.username) {
      setUser(userData);
      setNewUsername(userData.username);
    }
    setLoading(false);
  }, []);

  const handleSaveProfile = async () => {
    setLoading(true);
    const updatedProfile = {
      username: newusername,
      previousPassword,
      newPassword,
    };
    try {
      await axios.post(
        "http://localhost:5000/api/update-profile",
        updatedProfile,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setSettingsEditMode(false);
      setPreviousPassword("");
      setNewPassword("");
      toast.success("Logged out, redirecting...", {
        autoClose: 1500,
        position: "top-right",
      });
      await logoutUser();
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/logout",
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.removeItem("userDetails");
      localStorage.setItem("loggedIn?", false);
      setLoading(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 150);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchRoleDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user-role", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRoleDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const showProfileContent = async () => {
    setLoading(true);
    setshowManageProds(false);
    setshowManageuser(false);
    setTimeout(() => {
      setshowProfileCont(true);
      setLoading(false);
    }, 150);
  };

  const showManageProduct = async () => {
    setLoading(true);
    setshowProfileCont(false);
    setshowManageuser(false);
    setTimeout(() => {
      setshowManageProds(true);
      setLoading(false);
    }, 150);
  };

  const showManageUser = async () => {
    setLoading(true);
    setshowProfileCont(false);
    setshowManageProds(false);
    setTimeout(() => {
      setshowManageuser(true);
      setLoading(false);
    }, 150);
  };

  return (
    <>
      {loading ? (
        <div className="page-loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div className="profile">
            <div className="sidenav">
              <div className="sidenavborder">
                <div className="profile">
                  <img src={userLogo} className="alpesNoob-img" alt="" width="80px" height="80px" />
                </div>
                <div className="name">{user.username}</div>
                <div className="sidenav-url">
                  <div className="url">
                    <Link
                      onClick={showProfileContent}
                      className={`listofform ${
                        showProfileCont ? "active" : ""
                      }`}
                    >
                      Profile
                    </Link>
                  </div>
                  <div className="url">
                    <Link
                      to="/my-orders"
                      className={`listofform ${
                        showProfileCont ? "active" : ""
                      }`}
                    >
                      Orders
                    </Link>
                  </div>
                  {roleDetails.role === "admin" ? (
                    <>
                      <div className="url">
                        <Link
                          onClick={showManageProduct}
                          className={`listofform ${
                            showManageProds ? "active" : ""
                          }`}
                        >
                          Manage Products
                        </Link>
                      </div>

                      <div className="url">
                        <Link
                          onClick={showManageUser}
                          className={`listofform ${
                            showManageuser ? "active" : ""
                          }`}
                        >
                          Manage Users
                        </Link>
                      </div>
                    </>
                  ) : null}
                  <div className="url">
                    <Link className="listofform" onClick={logoutUser}>
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="main">
              {showProfileCont && (
                <>
                  <div className="card">
                    <FontAwesomeIcon
                      style={{
                        fontSize: "1.8rem",
                        marginLeft: "25rem",
                        marginTop: "1rem",
                      }}
                      onClick={() => setSettingsEditMode(!settingsEditMode)}
                      icon={settingsEditMode ? faClose : faEdit}
                    />
                    <h2 className="mainh2">IDENTITY</h2>
                    <div className="card-body">
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
                                  onChange={(e) =>
                                    setNewUsername(e.target.value)
                                  }
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={user.username}
                                  disabled
                                />
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
                                  value={"newAddress"}
                                  // onChange={(e) => setNewAddress(e.target.value)}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={"newAddress" || ""}
                                  disabled
                                />
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
                                  value={"newMobile"}
                                  // onChange={(e) => setNewMobile(e.target.value)}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={"newMobile" || ""}
                                  disabled
                                />
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
                                  value={"newCountry"}
                                  // onChange={(e) => setNewCountry(e.target.value)}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={"newCountry" || ""}
                                  disabled
                                />
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
                                  onChange={(e) =>
                                    setPreviousPassword(e.target.value)
                                  }
                                />
                              ) : (
                                <input
                                  type="password"
                                  value="**********"
                                  disabled
                                />
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
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                />
                              ) : (
                                <input
                                  type="password"
                                  value="**********"
                                  disabled
                                />
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
                            <FontAwesomeIcon
                              icon={faPaperPlane}
                            ></FontAwesomeIcon>
                          </button>
                        ) : (
                          <>
                            <button
                              style={{ width: "100", margin: "1rem" }}
                              className="submitprofilebut"
                              disabled
                            >
                              Submit &nbsp;&nbsp;
                              <FontAwesomeIcon
                                icon={faPaperPlane}
                              ></FontAwesomeIcon>
                            </button>
                          </>
                        )}
                      </table>
                    </div>
                  </div>
                </>
              )}
              {showManageProds && (
                <>
                  <ManageProduct />
                </>
              )}
              {showManageuser && (
                <>
                  <ManageUser />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileContent;
