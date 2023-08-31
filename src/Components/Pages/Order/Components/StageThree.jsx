import React from "react";

const StageThree = ({paymentMethod,handlePaymentChange,handleNextStage,handleBackStage}) => {
  return (
    <div className="stage-container">
      <h2
        style={{ textAlign: "center", fontSize: "28px", marginBottom: "1rem" }}
      >
        Select Payment Method
      </h2>
      <div className="payment-options">
        <label className="form-label pure-material-radio">
          <input
            type="radio"
            name="group"
            value="RazorPay"
            className="payment-option-input"
            checked={paymentMethod === "RazorPay"}
            onChange={handlePaymentChange}
          />
          <span className="payment-option-label">RazorPay</span>
        </label>
        <br />
        <br />
        <label className="form-label pure-material-radio">
          <input
            type="radio"
            name="group"
            value="Cash on Delivery"
            className="payment-option-input"
            checked={paymentMethod === "Cash on Delivery"}
            onChange={handlePaymentChange}
          />
          <span className="payment-option-label">Cash on Delivery</span>
        </label>
      </div>

      <button className="buttonsoforders" onClick={handleBackStage}>
        Back
      </button>
      <button className="buttonsoforder" onClick={handleNextStage}>
        Next
      </button>
    </div>
  );
};

export default StageThree;
