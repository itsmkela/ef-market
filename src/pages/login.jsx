import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  setTimeout(() => {
    // Simulate login
    const isAdmin = email.includes("admin"); // Simple demo logic

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify({
      email: email,
      fullName: "Demo User"
    }));
    localStorage.setItem("isAdmin", isAdmin);

    alert("Login successful!");
    window.location.href = "/dashboard";
  }, 1200);
};

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back to eFMarket</h1>
            <p>Sign in to manage your eFootball accounts</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* Back to Home Button at bottom */}
            <Link to="/" className="back-home-btn">
              ← Back to Home
            </Link>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">
                Create Account
              </Link>
            </p>
          </div>

          <div className="demo-hint">
            Demo: Use any email and any password
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;