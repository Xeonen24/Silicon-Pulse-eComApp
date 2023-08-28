import React from 'react'
import axios from "axios";
import {
  faEdit,
  faPaperPlane,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

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
    logoutUser
  } = props.data;


  const handleSaveProfile = async () => {
    setLoading(true);
    const updatedProfile = {
      username: newusername,
      previousPassword,
      newPassword,
    };
    try {
      await axios.post(
        process.env.REACT_APP_URL + "/auth/update-profile",
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

  return (
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
              <td>Country</td>
              <td>:</td>
              <td>
                  <input
                    type="text"
                    value={"India"}
                    disabled
                  />
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
        </table>
        {settingsEditMode ? (
            <button
              style={{ width: "33%", margin: "1rem" }}
              className="ascdscbut"
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
                style={{ width: "33%", margin: "1rem" }}
                className="ascdscbut"
                disabled
              >
                Submit &nbsp;&nbsp;
                <FontAwesomeIcon
                  icon={faPaperPlane}
                ></FontAwesomeIcon>
              </button>
            </>
          )}
      </div>
    </div>
  </>
  )
}

export default MainProfile