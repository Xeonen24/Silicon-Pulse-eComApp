import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./OrderPage.css";
import { Line, Circle } from "rc-progress";
import moment from "moment";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          process.env.REACT_APP_URL + "/order/getorders",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="order-page">
      <h1 className="order-heading">Your Orders</h1>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-details">
              <div className="order-idanddate">
                <p className="order-id">Order ID: {order._id}</p>
                <p className="order_date">
                  Order date: {moment(order.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
              <p className="payment-method">
                Payment Method: {order.paymentMethod}
              </p>
            </div>
            <div className="order-status">
              <Line
                percent={
                  order.shipped === "Processing"
                    ? 1
                    : order.shipped === "Shipped"
                    ? 25
                    : order.shipped === "In transit"
                    ? 50
                    : order.shipped === "Delivered"
                    ? 100
                    : order.shipped === "Cancelled"
                    ? 100
                    : 0
                }
                strokeWidth={1}
                strokeColor={
                  order.shipped === "Delivered"
                    ? "green"
                    : order.shipped === "Cancelled"
                    ? "red"
                    : "skyblue"
                }
              />

              <p className="status" style={{ fontSize: "1.2rem" }}>
                Status : &nbsp;
                <span
                  style={{
                    color:
                      order.shipped === "Delivered"
                        ? "green"
                        : order.shipped === "Cancelled"
                        ? "red"
                        : "skyblue",
                  }}
                >
                  {order.shipped}
                </span>
              </p>
            </div>
            <details className="learn-more">
              <summary>View Items</summary>
              <ul>
                {order.products.map((product, index) => (
                  <>
                    <li key={index}>
                      <div style={{ marginTop: "1rem", maxHeight: "250px" }}>
                        <strong>
                          <img
                            src={product.product.imagePath}
                            style={{
                              marginLeft: "1rem",
                              marginTop: "1rem",
                              height: "180px",
                              width: "180px",
                            }}
                          ></img>
                        </strong>
                        <Link
                          style={{ marginLeft: "1.7rem" }}
                          to={`/product/${product.product._id}`}
                        >
                          <button className="ascdscbut">Review</button>
                        </Link>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/product/${product.product._id}`}
                        >
                          <h4 className="prod_title">
                            {product.product.title}
                          </h4>
                        </Link>
                        <div className="order-priceandquantity">
                          <h4 className="prod_quantity">
                            Quantity: {product.quantity}
                          </h4>
                          <b className="prod_price">
                            Price: ₹ {product.product.price}
                          </b>
                        </div>
                      </div>
                    </li>
                    <hr />
                  </>
                ))}
              </ul>
              <p className="total-price-drop">Total: ₹ {order.totalPrice}</p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
