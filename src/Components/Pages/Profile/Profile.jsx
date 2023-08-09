import React, { useEffect } from "react";
import ProfileContent from "./ProfileContent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const chckLogin = localStorage.getItem("loggedIn?");
  
  useEffect(() => {
    IsLoggedIn();
    if (chckLogin === "false") {
      toast.error("Login required, redirecting...", {
        autoClose: 1500,
        position: "top-right",
      });
    }
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
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        return(
          <>
                    <p
          style={{ textAlign: "center", marginTop: "16rem", fontSize: "2rem" }}
        >
          Oh no! Something went wrong! Could not find the page you're looking
          for.
          <br />
          Redirecting.....
        </p>
          </>
        )
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div style={{ marginTop: "10rem" }}>{IsLoggedIn()}</div>;
};

export default Profile;
