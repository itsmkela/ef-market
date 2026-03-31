import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

// Import your video
import heroVideo from "../videos/efootball-background.mp4";

const mockAccounts = [
  {
    id: 1,
    name: "98 OVR Dream Team - Messi, Ronaldo & Haaland",
    featured: true,
    price: "149.99",
  },
  {
    id: 2,
    name: "eFootball 2026 - 15M GP + Full Epic Squad",
    featured: true,
    price: "89.99",
  },
  {
    id: 3,
    name: "God Tier Account - 105 OVR Big Time Players",
    featured: true,
    price: "229.99",
  },
];

const features = [
  {
    title: "Verified Sellers",
    desc: "All sellers are manually verified for your safety",
    icon: "✅",
  },
  {
    title: "Instant Delivery",
    desc: "Account details delivered in under 60 seconds",
    icon: "⚡",
  },
  {
    title: "Secure & Safe",
    desc: "Protected payments and account transfers",
    icon: "🔒",
  },
  {
    title: "24/7 Support",
    desc: "Dedicated eFootball support team",
    icon: "🛟",
  },
];

function Home() {
  return (
    <div className="home">
      {/* Navigation Bar */}
      {/* Navigation Bar */}
<nav className="navbar">
  <div className="nav-container">
    <div className="nav-logo">
      {/* Replace emoji with real image */}
      <img 
        src="/images/efmarket-logo.png" 
        alt="" 
        className="logo-img" 
      />
      <span className="logo-text">eFMarket</span>
    </div>

    <div className="nav-links">
      <Link to="/" className="nav-link active">Home</Link>
      <Link to="/shop" className="nav-link">Browse</Link>
     <Link 
  to="/sell" 
  className="nav-link"
  onClick={(e) => {
    // Simple check - you can improve this later with real auth
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      e.preventDefault();
      alert("Please login first to sell an account");
      window.location.href = "/login?redirect=/sell";
    }
  }}
>
  Sell Account
</Link>
    </div>

    <div className="nav-actions">
      <Link to="/cart" className="nav-icon">
        🛒
      </Link>
      <Link to="/login" className="nav-btn">
        Sign In
      </Link>
    </div>
  </div>
</nav>

      {/* Hero Section with Video Background */}
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={(e) => console.error("Video failed to load:", e)}
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-badge">🏆 eFootball 2026</div>

            <h1 className="hero-title">
              Buy & Sell{" "}
              <span className="highlight">eFootball Accounts</span>
            </h1>

            <p className="hero-subtitle">
              High OVR squads • Epic & Big Time players • Massive GP<br />
              The safest marketplace for serious eFootball players.
            </p>

            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">
                Join Now - It's Free
              </Link>
              <Link to="/shop" className="btn btn-secondary btn-large">
                Browse All Accounts
              </Link>
            </div>

            <div className="hero-trust">
              Trusted by 12,450+ eFootball players
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your content remains the same */}
      {/* Featured Accounts */}
      <section className="featured-section">
        <div className="section-header">
          <h2>🔥 Hot Featured Accounts</h2>
          <Link to="/shop" className="view-all">See All Accounts →</Link>
        </div>

        <div className="featured-grid">
          {mockAccounts.map((account) => (
            <div key={account.id} className="account-card">
              <div className="card-badge">FEATURED</div>
              <h3>{account.name}</h3>
              <div className="price">${account.price}</div>
              <Link to={`/account/${account.id}`} className="btn btn-buy">
                Buy Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why eFootball Players Choose Us</h2>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <h2>Ready to Take Your Team to the Next Level?</h2>
        <p>Start buying or selling premium eFootball accounts today.</p>

        <Link to="/shop" className="btn btn-primary btn-large">
          Browse eFootball Accounts Now
        </Link>
      </section>
    </div>
  );
}

export default Home;