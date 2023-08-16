import React from "react";

const StageOne = ({cartItems,totalPrice,handleBackStage,handleNextStage}) => {
  return (
    <div className="stage-container" style={{ width: "30%", left: "35%" }}>
      <h2
        style={{ textAlign: "center", fontSize: "28px", marginBottom: "1rem" }}
      >
        Confirm Your Items
      </h2>
      <table className="item-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.product._id}>
              <td>{item.product.title}</td>
              <td>{item.quantity}</td>
              <td>₹ {item.product.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ textAlign: "right", marginTop: "1rem" }}>
        Total: ₹{totalPrice}
      </h3>
      <div
        className="buttoncontainer"
        style={{ position: "absolute", width: "100%" }}
      >
        <button className="buttonsoforders" disabled onClick={handleBackStage}>
          Back
        </button>
        <button className="buttonsoforder" onClick={handleNextStage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StageOne;
