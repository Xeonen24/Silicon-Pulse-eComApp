import React, { useEffect } from "react";
import axios from "axios";
import {
  faEdit,
  faPaperPlane,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import moment from "moment";

const MainProfile = (props) => {
  const {
    settingsEditMode,
    setSettingsEditMode,
    newusername,
    setNewUsername,
    previousPassword,
    setPreviousPassword,
    newPassword,
    setNewPassword,
    user,
    setLoading,
    logoutUser,
  } = props.data;

  useEffect(() => {
    document.title = "Silicon Pulse | Profile";
  }, []);

  const handleSaveProfile = async () => {
    setLoading(true);
    const updatedProfile = {
      username: newusername,
      previousPassword,
      newPassword,
    };
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(`${process.env.REACT_APP_URL}/auth/update-profile`,
        {
          updatedProfile,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="card">
        <div className="mainh2">
          <h1>My profile</h1>
          <h3>User Since : {moment(user.createdAt).format("DD MMM YYYY")}</h3>
        </div>
        <hr />
        <FontAwesomeIcon
          style={{
            fontSize: "2rem",
            float: "right",
            margin: "1rem",
          }}
          onClick={() => setSettingsEditMode(!settingsEditMode)}
          icon={settingsEditMode ? faClose : faEdit}
        />
        <div style={{ display: "flex" }} className="card-body">
          <div style={{ width: "25%", margin: "1rem", fontSize: "1.4rem" }}>
            <label className="labelprofile">Username :</label>
            {settingsEditMode ? (
              <input
                className="profileinput"
                type="text"
                style={{ border: "1px solid rgb(255, 130, 130" }}
                value={newusername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            ) : (
              <input
                className="profileinput"
                type="text"
                style={{ backgroundColor: "white" }}
                value={user.username}
                disabled
              />
            )}
            <label className="labelprofile">Email :</label>
            <input
              className="profileinput"
              type="text"
              style={{ backgroundColor: "white" }}
              disabled
              value={user.email}
            ></input>
          </div>
          <div
            style={{
              width: "25%",
              margin: "1rem",
              marginLeft: "4rem",
              fontSize: "1.4rem",
            }}
          >
            <label className="labelprofile">Previous assword :</label>
            {settingsEditMode ? (
              <input
                className="profileinput"
                type="text"
                style={{
                  backgroundColor: "white",
                  border: "1px solid rgb(255, 130, 130",
                }}
                value={previousPassword}
                onChange={(e) => setPreviousPassword(e.target.value)}
              ></input>
            ) : (
              <input
                className="profileinput"
                type="text"
                disabled
                style={{ backgroundColor: "white" }}
                value="********************"
              ></input>
            )}
            <label className="labelprofile">New password :</label>
            {settingsEditMode ? (
              <input
                className="profileinput"
                type="text"
                style={{
                  backgroundColor: "white",
                  border: "1px solid rgb(255, 130, 130",
                }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
            ) : (
              <input
                className="profileinput"
                type="text"
                disabled
                style={{ backgroundColor: "white" }}
                value="********************"
              ></input>
            )}
          </div>
        </div>
        {settingsEditMode ? (
          <button
            style={{ width: "auto", margin: "1rem" }}
            className="ascdscbut"
            onClick={handleSaveProfile}
          >
            Submit &nbsp;&nbsp;
            <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
          </button>
        ) : (
          <>
            <button
              style={{ width: "auto", margin: "1rem" }}
              className="ascdscbut"
              disabled
            >
              Submit &nbsp;&nbsp;
              <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default MainProfile;
