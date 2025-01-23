import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState("");

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users`, {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (err) {
      setError("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleBlockUsers = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/block`,
        { userIds: selectedUsers },
        { withCredentials: true }
      );
      fetchUsers();
    } catch (err) {
      setError("Error blocking users");
    }
  };

  const handleUnblockUsers = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/unblock`,
        { userIds: selectedUsers },
        { withCredentials: true }
      );
      fetchUsers();
    } catch (err) {
      setError("Error unblocking users");
    }
  };

  const handleDeleteUsers = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/users/delete`,
        { userIds: selectedUsers },
        { withCredentials: true }
      );
      fetchUsers();
    } catch (err) {
      setError("Error deleting users");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/logout`,
        {},
        { withCredentials: true }
      );
      window.location.href = "/login";
    } catch (err) {
      setError("Error logging out");
    }
  };

  return (
    <div>
      <h1>Manage Users</h1>
      {error && <p>{error}</p>}
      <button onClick={handleBlockUsers}>Block Selected</button>
      <button onClick={handleUnblockUsers}>Unblock Selected</button>
      <button onClick={handleDeleteUsers}>Delete Selected</button>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <label>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user._id)}
                onChange={() => handleSelectUser(user._id)}
              />
              {user.name} ({user.email}) {user.blocked ? "Blocked" : "Active"}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;