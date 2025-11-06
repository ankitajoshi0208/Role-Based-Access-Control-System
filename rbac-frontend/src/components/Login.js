import React, { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { loginUser } from "../api/api";

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
      const { data } = await loginUser(form);
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
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{" "}
        <span onClick={onSwitchToRegister} style={{ color: "blue", cursor: "pointer" }}>
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;
