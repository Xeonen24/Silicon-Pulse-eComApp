import React, { useEffect } from "react";
import "./ty.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ThankYouPage = () => {
  useEffect(() => {
    toast.info(`Order placed, thank you!`, {
      autoClose: 2000,
      position: "top-right",
    });
    setTimeout(() => {
      window.location.href="/"
    },10000)
  }, []);

  return (
    <div className="thank-you-page">
      <main className="content">
        <h1 className="thank-you-header">Thank You for Your Order!</h1>
        <div className="buttonscontainer">
        <Link to='/profile'>
       <button >My profile</button>
       </Link> 
       <Link style={{marginLeft:'1rem'}} to='/product'>
       <button >Continue Shopping</button>
       </Link> 
       </div>
       <Link style={{marginLeft:'49.5rem'}}>You'll be redirected to home page in 10 seconds.</Link>
      </main>
    </div>
  );
};

export default ThankYouPage;
