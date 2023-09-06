import React, { useEffect ,useState} from "react";
import ProfileContent from "./ProfileContent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const chckLogin = localStorage.getItem("loggedIn?");
  
  useEffect(() => {
    IsLoggedIn();
    if (chckLogin === "false") {
      toast.error("Login required, redirecting...", {
        autoClose: 1500,
        position: "top-right",
      });
    }
    setLoading(false);
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
          window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div style={{ marginTop: "10rem" }}>
     {loading ? (
        <div className="page-loading">
          <div className="spinner"></div>
        </div>
      ):(
        IsLoggedIn()
      )}
    </div>;
};

export default Profile;
