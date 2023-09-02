import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [usersData, setUsersData] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await axios.get(process.env.REACT_APP_URL + "/admin/get-orders", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);

      const usersRes = await axios.get(process.env.REACT_APP_URL + "/admin/get-users", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      const usersById = usersRes.data.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {});
      setUsersData(usersById);
    } catch (error) {
      console.log(error);
    }
  };

  const updateShippedStatus = async (orderId, newStatus) => {
    setLoading(true);
    try {
      const response = await axios.put(
        process.env.REACT_APP_URL + `/admin/update-shipping/${orderId}`,
        { shipped: newStatus },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === response.data._id ? response.data : order
        )
      );
      setSelectedOrder(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error updating shipped status:", error);
    }
  };

  const renderOrderRow = (order) => {
    if (selectedOrder && selectedOrder._id === order._id) {
      return (
        <tr className="orderInfox" key={order._id}>
          <td>{moment(order.createdAt).format("DD MMM YYYY")}</td>
          <td>{(order._id).slice(20, 25)}</td>
          <td>{order.paymentMethod}</td>
          <td>{order.transactionId}</td>
          <td>{usersData[order.user]?.username}</td>
          <td>{order.totalPrice}</td>
          <td>
            <select
              value={order.shipped}
              onChange={(e) => updateShippedStatus(order._id, e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="In transit">In transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </td>
          <td className="userEditx" onClick={() => closeEditOrder(order)}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </td>
        </tr>
      );
    } else {
      return (
        <tr className="orderInfox" key={order._id}>
          <td>{moment(order.createdAt).format("DD MMM YYYY")}</td>
          <td>{(order._id).slice(20, 25)}</td>
          <td>{order.paymentMethod}</td>
          <td>{order.transactionId}</td>
          <td>{usersData[order.user]?.username}</td>
          <td>{order.totalPrice}</td>
          <td>{order.shipped}</td>
          <td className="userEditx" style={{ cursor: "pointer" }} onClick={() => editOrder(order)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </td>
        </tr>
      );
    }
  };

  const editOrder = (order) => {
    setSelectedOrder(order);
  };
  const closeEditOrder = () => {
    setSelectedOrder(null);
  };


  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {loading ? (
        <div className="page-loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <div style={{marginTop:'3rem'}}>
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Ordered on</th>
                <th>ID</th>
                <th>Payment Method</th>
                <th>TXN ID</th>
                <th>Ordered by</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>{selectedOrder ? "Close edit" : "Edit Order"}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => renderOrderRow(order))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
};

export default ManageOrders;
