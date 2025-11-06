import React, { useContext, useState } from "react";
import { AuthProvider, AuthContext } from "./components/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./App.css";
const AppContent = () => {
  const { user } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  if (user) return <Dashboard />;

  return showRegister ? (
    <Register onSwitchToLogin={() => setShowRegister(false)} />
  ) : (
    <Login onSwitchToRegister={() => setShowRegister(true)} />
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
