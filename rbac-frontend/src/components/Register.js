import React, { useState } from "react";
import { registerUser } from "../api/api";

const Register = ({ onSwitchToLogin }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "viewer", // default role
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      setMessage("Registration successful! Please log in.");
    } catch (error) {
      setMessage("Registration failed. Try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Select Role:</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <span onClick={onSwitchToLogin} style={{ color: "blue", cursor: "pointer" }}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default Register;
