import React, { useEffect, useState } from "react";
import axios from "axios";
import userLogo from "../../../Images/user.png";
import { Link } from "react-router-dom";
import "./profile.css";
import "react-toastify/dist/ReactToastify.css";
import ManageProduct from "../AdminPanel/ManageProduct/manageProduct";
import ManageUser from "../AdminPanel/ManageUser/manageUser";
import MainProfile from "./mainProfile";
import SideNav from "./sideNav";
import OrderPage from "./orderPage";
import ManageOrders from "../AdminPanel/ManageOrders/manageOrders";

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
  const [showManageOrder, setshowManageOrder] = useState(false);
  const [showOrderPage, setShowOrderPage] = useState(false);
  const [loading, setLoading] = useState(true);


  const logoutUser = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
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


  const fetchRoleDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/user-role", {
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
    setShowOrderPage(false);
    setshowManageOrder(false);
    setTimeout(() => {
      setshowProfileCont(true);
      setLoading(false);
    }, 150);
  };

  const showManageProduct = async () => {
    setLoading(true);
    setshowProfileCont(false);
    setshowManageuser(false);
    setShowOrderPage(false);
    setshowManageOrder(false);
    setTimeout(() => {
      setshowManageProds(true);
      setLoading(false);
    }, 150);
  };

  const showManageUser = async () => {
    setLoading(true);
    setshowProfileCont(false);
    setshowManageProds(false);
    setShowOrderPage(false);
    setshowManageOrder(false);
    setTimeout(() => {
      setshowManageuser(true);
      setLoading(false);
    }, 150);
  };

  const showManageOrders = async () => {
    setLoading(true);
    setshowProfileCont(false);
    setshowManageProds(false);
    setShowOrderPage(false);
    setshowManageuser(false);
    setTimeout(() => {
      setshowManageOrder(true);
      setLoading(false);
    }, 150);
  }

  const showOrderpage = async () => {
    setLoading(true);
    setshowProfileCont(false);
    setshowManageProds(false);
    setshowManageuser(false);
    setshowManageOrder(false);
    setTimeout(() => {
      setShowOrderPage(true);
      setLoading(false);
    }, 150);
  };

  const data1 = {
    userLogo,
    user,
    Link,
    showProfileContent,
    showProfileCont,
    roleDetails,
    showManageProduct,
    showManageProds,
    showManageUser,
    showManageuser,
    showManageOrder,
    setshowManageOrder,
    logoutUser,
    showOrderpage,
    showOrderPage,
    showManageOrders
  };
  
  const data2 = {
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
                <SideNav data={data1} />

            <div className="main">

                {showOrderPage && (
                  <OrderPage /> )}

                {showProfileCont && (
                  <MainProfile data={data2} /> 
                )}
                {showManageProds && (
                  <>
                    <ManageProduct />
                  </>
                )}
                {showManageOrder && (
                  <>
                    <ManageOrders />
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
