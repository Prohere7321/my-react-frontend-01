import { useEffect, useState } from "react";

function UserManagement() {

  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: ""
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: ""
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {
        // UPDATE
        await fetch(`http://localhost:3000/api/user/${editingId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            firstname: formData.firstname,
            lastname: formData.lastname,
            status: "ACTIVE"
          })
        });
      } else {
        // CREATE
        await fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
      }

      resetForm();
      fetchUsers();

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      firstname: user.firstname || "",
      lastname: user.lastname || ""
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await fetch(`http://localhost:3000/api/user/${id}`, {
        method: "DELETE"
      });

      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

      <h3>{editingId ? "Edit User" : "Add User"}</h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {!editingId && (
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        )}
        <input
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
        />
        <input
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update" : "Create"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </form>

      <h3>User List</h3>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users && users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button
                  onClick={() => handleDelete(user._id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default UserManagement;