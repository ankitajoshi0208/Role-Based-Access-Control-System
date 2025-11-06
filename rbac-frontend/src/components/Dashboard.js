import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import Posts from "./Posts";
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const canEdit = user.role === "admin" || user.role === "editor";
  const canDelete = user.role === "admin";

  return (
    <div className="dashboard-wrapper">
      <nav className="navbar">
        <div className="navbar-brand">
          RBAC Dashboard
        </div>
        
        <div className="navbar-center">
          <h2>Welcome, {user.username}</h2>
          <p>Role: {user.role}</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </nav>

      <div className="dashboard-content">
        <Posts canEdit={canEdit} canDelete={canDelete} />
      </div>
    </div>
  );
};

export default Dashboard;
