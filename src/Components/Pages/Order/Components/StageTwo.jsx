import React from "react";
import indianStates from "./states";

const StageTwo = ({address,handleAddressChange,handleBackStage,handleNextStage}) => {
  const handleZipInput = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 6) {
      e.target.value = inputValue.slice(0, 6);
    }
  };

  return (
    <div className="stage-container">
      <h2 style={{ textAlign: "center", fontSize: "28px" }}>
        Enter Your Address
      </h2>
      <form className="amazon-form">
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={address.name}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="street">
            Street Address:
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="city">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="state">
            State:
          </label>
          <select
            className="dropdownState"
            style={{ width: "100%" }}
            id="state"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            required
          >
            <option value="" disabled>
              &nbsp;Select State
            </option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="zip">
            Zip Code:
          </label>
          <input
            type="number"
            id="zip"
            name="zip"
            value={address.zip}
            onChange={handleAddressChange}
            onInput={handleZipInput}
            min={100000}
            max={999999}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="country">
            Country:
          </label>
          <select
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={handleAddressChange}
            required
          >
            <option value="India">India</option>
          </select>
        </div>
      </form>
      <button className="buttonsoforders" onClick={handleBackStage}>
        Back
      </button>
      <button className="buttonsoforder" onClick={handleNextStage}>
        Next
      </button>
    </div>
  );
};

export default StageTwo;
