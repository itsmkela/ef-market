import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate getting user from localStorage (you'll replace this with real auth later)
    const savedUser = localStorage.getItem("user");
    const savedIsAdmin = localStorage.getItem("isAdmin") === "true";

    if (!savedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(savedUser));
    setIsAdmin(savedIsAdmin);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Welcome back, {user.fullName || user.email}</h1>
          <p className="user-role">{isAdmin ? "Admin Panel" : "User Dashboard"}</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        {isAdmin ? <AdminDashboard /> : <UserDashboard />}
      </div>
    </div>
  );
}

// ==================== USER DASHBOARD ====================
function UserDashboard() {
  return (
    <div className="user-dashboard">
      <h2>Your Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>0</h3>
          <p>Active Listings</p>
        </div>
        <div className="stat-card">
          <h3>2</h3>
          <p>Pending Purchases</p>
        </div>
        <div className="stat-card">
          <h3>$245</h3>
          <p>Total Spent</p>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <p>No recent activity yet.</p>
      </div>

      <div className="quick-actions">
        <button className="action-btn">Browse Accounts</button>
        <button className="action-btn">Sell New Account</button>
      </div>
    </div>
  );
}

// ==================== ADMIN DASHBOARD ====================
function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Admin Panel</h2>
      
      <div className="admin-stats">
        <div className="stat-card admin-card">
          <h3>124</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-card admin-card">
          <h3>47</h3>
          <p>Accounts Listed</p>
        </div>
        <div className="stat-card admin-card">
          <h3>12</h3>
          <p>Pending Reviews</p>
        </div>
      </div>

      <div className="admin-sections">
        <div className="admin-section">
          <h3>Pending Account Reviews</h3>
          <p>3 accounts waiting for approval</p>
        </div>
        
        <div className="admin-section">
          <h3>Recent Sales</h3>
          <p>Last 24 hours: 8 accounts sold</p>
        </div>
      </div>

      <div className="admin-actions">
        <button className="admin-btn">Manage Users</button>
        <button className="admin-btn">Review Submissions</button>
        <button className="admin-btn">View All Accounts</button>
      </div>
    </div>
  );
}

export default Dashboard;