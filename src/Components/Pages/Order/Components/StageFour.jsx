import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StageFour = ({address,handleBackStage,cartItems,totalPrice,paymentMethod}) => {

  const clearCart = async () => {
    try {
      await axios.delete(process.env.REACT_APP_URL + `/cart/cart/remove-all`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    const addressData = {
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
    };

    const amount = totalPrice;

    if (totalPrice > 0) {
      const options = {
        key: "rzp_test_ZaBqur5zk4j0JC",
        key_secret: "T1VutDUqjsce2ZKfv04chR8O",
        amount: amount * 100,
        currency: "INR",
        name: "SiliconPulse Merchant",
        handler: async function (response) {
          try {
            const addressResponse = await axios.post(
              process.env.REACT_APP_URL + "/order/saveaddress",
              addressData,
              {
                withCredentials: true,
              }
            );

            const orderData = {
              totalPrice: totalPrice,
              paymentMethod: paymentMethod,
              products: cartItems.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
              })),
              transactionId: response.razorpay_payment_id,
              addressId: addressResponse.data._id,
            };

            const res = await axios.post(
              process.env.REACT_APP_URL + "/order/makeorder",
              orderData,
              {
                withCredentials: true,
              }
            );
            if (res.status === 201) {
              clearCart();
              toast.success(
                `Payment Successful, track your order on your profile.`,
                {
                  autoClose: 2000,
                  position: "top-right",
                }
              );
              toast.info(
                `Redirecting....`,
                {
                  autoClose: 2000,
                  position: "top-right",
                }
              );
              setTimeout(() => {
                window.location.href = "/ty";
              },2000)
            } else {
              throw new Error("Error processing payment");
            }
          } catch (error) {
            console.error("Error creating order:", error);
          }
        },
        notify: {
          sms: true,
          email: true,
        },
        notes: {
          address: "Alibag, 402201",
        },
        theme: {
          color: "black",
        },
      };
      const pay = new window.Razorpay(options);
      pay.open();
    }
  };

  return (
    <div className="stage-container" style={{ left: "30%", width: "40%" }}>
      <h2 style={{ textAlign: "center", fontSize: "28px" }}>Confirm Order</h2>
      <div className="order-summary">
        <h3
          style={{
            textAlign: "center",
            fontSize: "28px",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          Order Summary
        </h3>
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
        <h4 style={{ textAlign: "right" }}>Total Price: ₹ {totalPrice}</h4>
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
      <button className="buttonsoforders" onClick={handleBackStage}>
        Back
      </button>
      <button className="buttonsoforder" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default StageFour;
