import React, { useState } from "react";
import { registerUser } from "../api/api";
import "./Register.css";

const Register = ({ onSwitchToLogin }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "viewer",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      onSwitchToLogin();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-logo">
        <h1>RBAC System</h1>
      </div>

      <h2>Create Account</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Select your role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
          <div className="role-info">
            Choose your role carefully as it determines your access level
          </div>
        </div>

        <button type="submit">Create your account</button>
      </form>

      <div className="divider">Already have an account?</div>

      <div className="register-footer">
        <span className="login-link" onClick={onSwitchToLogin}>
          Sign in to your account
        </span>
      </div>
    </div>
  );
};

export default Register;
