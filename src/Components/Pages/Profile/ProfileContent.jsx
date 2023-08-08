import React,{ useEffect, useState } from "react";
import axios from "axios";
import userLogo from "../../../Images/user.png";
import { Link } from "react-router-dom";
import "./profile.css";
import { faEdit,faPaperPlane,faClose} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProfileContent() {

    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [settingsEditMode, setSettingsEditMode] = useState(false); // New state variable
    const [newusername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newMobile, setNewMobile] = useState("");
    const [newCountry, setNewCountry] = useState("");
    const [previousPassword, setPreviousPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
    useEffect(() => {
      const userData = localStorage.getItem("userDetails");
  
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
  
        setNewUsername(parsedUserData.username);
        setNewEmail(parsedUserData.email);
        setNewAddress(parsedUserData.address || "");
        setNewMobile(parsedUserData.mobile || "");
        setNewCountry(parsedUserData.country || "");
      }
    }, []);
  
    const handleEditProfile = () => {
      setEditMode(true);
    };
  
    const handleSaveProfile = () => {
      const updatedProfile = {
        username: newusername,
        email: newEmail,
        // address: newAddress,
        // mobile: newMobile,
        // country: newCountry,
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
      setNewUsername(user.newusername);
      setPreviousPassword("");
      setNewPassword("");
    };
  
    const toggleUserDropdown = (e) => {
      if (!e.target.closest(".userDropdown")) {
        setIsDropdownVisible(!isDropdownVisible);
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
                <Link className="url">Logout</Link>
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
                <div className="edit-buttons">
                  <button onClick={handleSaveProfile}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
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
                      {settingsEditMode ? (
                        <input
                          type="text"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
                      ) : (
                        <input type="text" value={user.email} disabled />
                      )}
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
                        <input type="text" value={newAddress || "."} disabled />
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
                        <input type="text" value={newMobile || "."} disabled />
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
                        <input type="text" value={newCountry || "."} disabled />
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
}

export default ProfileContent;
