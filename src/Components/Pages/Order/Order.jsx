import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./order.css";
import ProgressLine from "./Components/ProgressLine";
import StageOne from "./Components/StageOne";
import StageTwo from "./Components/StageTwo";
import StageThree from "./Components/StageThree";
import StageFour from "./Components/StageFour";

const Order = () => {
  const location = useLocation();
  const { cartItems, totalPrice } = location.state;
  const [stage, setStage] = useState(1);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("RazorPay");
 
  const handleNextStage = () => {
    setStage((prevStage) => prevStage + 1);
  };

  const handleBackStage = () => {
    setStage((prevStage) => prevStage - 1);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleStageClick = (clickedStage) => {
    setStage(clickedStage);
  };

  const renderProgressBar = () => {
    return (
     <ProgressLine stage={stage} handleStageClick={handleStageClick}/>
    );
  };

  const renderStageOne = () => (
    <StageOne cartItems={cartItems} totalPrice={totalPrice} handleBackStage={handleBackStage} handleNextStage={handleNextStage}/>
  );

  const renderStageTwo = () => (
    <StageTwo address={address} handleAddressChange={handleAddressChange} handleBackStage={handleBackStage} handleNextStage={handleNextStage}/>
  );

  const renderStageThree = () => (
   <StageThree paymentMethod={paymentMethod} handlePaymentChange={handlePaymentChange} handleBackStage={handleBackStage} handleNextStage={handleNextStage}/>
  );

  const renderStageFour = () => (
   <StageFour address={address} cartItems={cartItems} totalPrice={totalPrice} handleBackStage={handleBackStage} paymentMethod={paymentMethod}/>
  );

  return (
    <div className="order-container">
      {renderProgressBar()}
      {stage === 1 && renderStageOne()}
      {stage === 2 && renderStageTwo()}
      {stage === 3 && renderStageThree()}
      {stage === 4 && renderStageFour()}
    </div>
  );
};

export default Order;
