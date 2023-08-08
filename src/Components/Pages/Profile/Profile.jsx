import React, { useEffect } from "react";
import ProfileContent from "./ProfileContent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const chckLogin = localStorage.getItem("loggedIn?");
  
  useEffect(() => {
    IsLoggedIn();
  }, []);

  const IsLoggedIn = () => {
    try {
      if (chckLogin === "true") {
        return (
          <>
            <ProfileContent />
          </>
        );
      } else {
        toast.error("Login required, redirecting...", {
          autoClose: 1500,
          position: "top-right",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div style={{ marginTop: "10rem" }}>{IsLoggedIn()}</div>;
};

export default Profile;
