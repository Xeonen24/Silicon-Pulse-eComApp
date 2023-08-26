import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./manageUser.css";
import { toast } from "react-toastify";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleDetails, setRoleDetails] = useState("");

  const fetchRoleDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/user-role",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRoleDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(roleDetails);
    if (roleDetails.role === "admin") {
      toast.info("Authorization check complete.", {
        autoClose: 1000,
        position: "top-right",
        toastId: "admin-toast",
      });
    }
  }, [roleDetails.role]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/get-users",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchRoleDetails();
    fetchUsers();
  }, []);

  const editUser = (user) => {
    setSelectedUser(user);
  };
  const closeeditUser = () => {
    setSelectedUser(null);
  };

  const deleteUser = async (user) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/delete-user/${user._id}`,
        user,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === response.data._id ? response.data : user
        )
      );
      setSelectedUser(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/update-user/${updatedUser._id}`,
        updatedUser,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === response.data._id ? response.data : user
        )
      );
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const renderUserRow = (user) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    };

    if (selectedUser && selectedUser._id === user._id) {
      return (
        <tr className="userInfox" key={user._id}>
          <td className="userIdx">{user._id.slice(20, 25)}</td>
          <td className="userCreatedAtx">
            <label type="text">{formatDate(selectedUser.createdAt)}</label>
          </td>
          <td className="userCreatedAtx">
            <label type="text">{formatDate(selectedUser.updatedAt)}</label>
          </td>
          <td className="userNamex">
            <label>{selectedUser.username}</label>
          </td>
          <td className="userEmailx">
            <label>{selectedUser.email}</label>
          </td>
          <td className="userRolex">
            <select
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser((prevUser) => ({
                  ...prevUser,
                  role: e.target.value,
                }))
              }
            >
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </td>
          <td className="userEditx" onClick={() => updateUser(selectedUser)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </td>
          <td className="userDeletex" onClick={closeeditUser}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </td>
        </tr>
      );
    } else {
      return (
        <tr className="userInfox" key={user._id}>
          <td className="userIdx">{user._id.slice(20, 25)}</td>{" "}
          <td className="userCreatedAtx">
            <label type="text">{formatDate(user.createdAt)}</label>
          </td>
          <td className="userCreatedAtx">
            <label type="text">{formatDate(user.updatedAt)}</label>
          </td>
          <td className="userNamex">{user.username}</td>
          <td className="userEmailx">{user.email}</td>
          <td className="userRolex">{user.role}</td>
          <td className="userEditx" onClick={() => editUser(user)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </td>
          <td className="userDeletex" onClick={() => deleteUser(user)}>
            <FontAwesomeIcon icon={faTrash} />
          </td>
        </tr>
      );
    }
  };

  return (
    <div className="user-List">
      <table>
        <thead>
          <tr>
            <th>UID</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit User</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>{users.map((user) => renderUserRow(user))}</tbody>
      </table>
    </div>
  );
};

export default ManageUser;
