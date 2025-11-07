import React, { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { loginUser } from "../api/api";
import "./Login.css";

const Login = ({ onSwitchToRegister }) => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("username", res.data.user.username);
      login(res.data.user);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <h1>RBAC System</h1>
      </div>
      
      <h2>Sign in</h2>
      
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
          />
        </div>
        
        <button type="submit">Sign in</button>
      </form>
      
      <div className="divider">New to RBAC?</div>
      
      <div className="login-footer">
        <span className="register-link" onClick={onSwitchToRegister}>
          Create your RBAC account
        </span>
      </div>
    </div>
  );
};

export default Login;
