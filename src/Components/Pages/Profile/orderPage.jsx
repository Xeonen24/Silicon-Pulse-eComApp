import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderPage.css'; // Import your CSS file for styling
import { width } from '@mui/system';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/order/getorders',
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="order-page">
      <h1 className='order-heading'>Your Orders</h1>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-details">
              <p className="order-id">Order ID: {order._id}</p>
              <p className="total-price">Total Price: ${order.totalPrice}</p>
              <p className="payment-method">Payment Method: {order.paymentMethod}</p>
            </div>
            <div className="order-status">
              <p className="status">Status: {order.shipped}</p>
            </div>
              <details>
                <summary>View Items</summary>
                <ul>
                  {order.products.map((product, index) => (
                    <li key={index}>
                      <strong><img src={product.product.imagePath} style={ {width : "80px" }}></img></strong>
                      <strong>Title:</strong> {product.product.title}<br />
                      <strong>Price:</strong> ${product.product.price}<br />
                      <strong>Quantity:</strong> {product.quantity}
                    </li>
                  ))}
                </ul>
              </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
