import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare,faTrash } from "@fortawesome/free-solid-svg-icons";
import './manageUser.css'

const ManageUser = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get-users", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const editUser = () => {

  }
  const deleteUser = () => {
    
  }

  return (
    <div className="user-List">
      <table>
        <thead>
          <tr>
            <th>UID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit User</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="userInfox" key={user._id}>
              <td className="userIdx">{user._id}</td>
              <td className="userNamex">{user.username}</td>
              <td className="userEmailx">{user.email}</td>
              <td className="userRolex">{user.role}</td>
              <td className="userEditx" onClick={editUser}><FontAwesomeIcon icon={faPenToSquare}/></td>
              <td className="userDeletex" onClick={deleteUser}><FontAwesomeIcon icon={faTrash}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
