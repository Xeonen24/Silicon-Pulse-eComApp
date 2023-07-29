import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './order.css'

const Order = () => {
  const location = useLocation();
  const { cartItems, totalPrice } = location.state;
  const [stage, setStage] = useState(1);
  const progressWidths =[0, 25, 50, 75];
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    zip: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

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

  const renderProgressBar = () => {
    return (
      <div className="progress-container">
        <div className={`progress-circle ${stage >= 1 ? 'active' : ''}`}>1</div>
        <div className={`progress-circle ${stage >= 2 ? 'active' : ''}`}>2</div>
        <div className={`progress-circle ${stage >= 3 ? 'active' : ''}`}>3</div>
        <div className={`progress-circle ${stage >= 4 ? 'active' : ''}`}>4</div>
        <div
          className="progress-line"
          style={{
            width: `${progressWidths[stage - 1]}%`,
          }}
        ></div>
      </div>
    );
  };

  const renderStageOne = () => (
    <div className="stage-container">
      <h2>Confirm Your Items</h2>
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
              <td>${item.product.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleNextStage}>Next</button>
    </div>
  );

  const renderStageTwo = () => (
    <div className="stage-container">
      <h2>Enter Your Address</h2>
      <form className="amazon-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
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
          <label htmlFor="street">Street Address:</label>
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
          <label htmlFor="city">City:</label>
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
          <label htmlFor="zip">Zip Code:</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={address.zip}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={handleAddressChange}
            required
          />
        </div>
      </form>
      <button onClick={handleBackStage}>Back</button>
      <button onClick={handleNextStage}>Next</button>
    </div>
  );

  const renderStageThree = () => (
    <div className="stage-container">
      <h2>Select Payment Method</h2>
      <div className="payment-options">
        <label>
          <input
            type="radio"
            value="Credit Card"
            checked={paymentMethod === 'Credit Card'}
            onChange={handlePaymentChange}
          />
          Credit Card
        </label>
        <label>
          <input
            type="radio"
            value="PayPal"
            checked={paymentMethod === 'PayPal'}
            onChange={handlePaymentChange}
          />
          PayPal
        </label>
        <label>
          <input
            type="radio"
            value="Cash on Delivery"
            checked={paymentMethod === 'Cash on Delivery'}
            onChange={handlePaymentChange}
          />
          Cash on Delivery
        </label>
      </div>
      <button onClick={handleBackStage}>Back</button>
      <button onClick={handleNextStage}>Next</button>
    </div>
  );

  const renderStageFour = () => (
    <div className="stage-container">
      <h2>Confirm Order</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
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
                <td>${item.product.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total Price: ${totalPrice}</h3>
      </div>
      <div className="payment-info">
        <h3>Payment Method</h3>
        <p>{paymentMethod}</p>
      </div>
      <div className="address-info">
        <h3>Shipping Address</h3>
        <p>Name: {address.name}</p>
        <p>Street: {address.street}</p>
        <p>City: {address.city}</p>
        <p>Zip Code: {address.zip}</p>
        <p>Country: {address.country}</p>
      </div>
      <button className="pay-button">Pay Now</button>
      <button onClick={handleBackStage}>Back</button>
    </div>
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
