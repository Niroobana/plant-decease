import { useEffect, useState } from "react";
import api from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const loadUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post("/users", {
        name,
        email,
      });

      setName("");
      setEmail("");

      setMessage("User created successfully");

      await loadUsers();
    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage("Failed to create user");
      }
    }
  };

  return (
    <div>
      <h1>Users</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <br />

          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="email">Email</label>
          <br />

          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          Add User
        </button>
      </form>

      {message && <p>{message}</p>}

      <hr />

      <h2>User List</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;