import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './OrderPage.css';
import { Line, Circle } from 'rc-progress';
import moment from 'moment';

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
  console.log(orders);
  return (
    <div className="order-page">
      <h1 className='order-heading'>Your Orders</h1>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-details">
              <p className="order-id">Order ID: {order._id}</p>
              <p className="order_date">Order date: {moment(order.createdAt).format("DD MMM YYYY")}</p>
              <p className="payment-method">Payment Method: {order.paymentMethod}</p>
            </div>
            <div className="order-status">
            <Line percent={12} strokeWidth={1} strokeColor="red" />
              <p className="status">Status: {order.shipped}</p>
            </div>
            <details className="learn-more">
                <summary>View Items</summary>
              <ul>
                {order.products.map((product, index) => (
                  <>
                    <li key={index} >
                      <div style={{ marginTop: '1rem', maxHeight: '210px' }}>
                        <strong><img src={product.product.imagePath} style={{ marginLeft: "1rem", marginTop: "1rem", height: "180px", width: "180px" }}></img></strong>
                        <Link style={{ textDecoration: 'none' }} to={`/product/${product.product._id}`}>
                          <h4 className='prod_title'>{product.product.title}</h4>
                        </Link>
                        <b className='prod_price'>Price: ₹ {product.product.price}</b>
                        <h4 className='prod_quantity'>Quantity: {product.quantity}</h4>
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
