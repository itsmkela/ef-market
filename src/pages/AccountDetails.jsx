import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./accountDetail.css";

const allAccounts = [
  {
    id: 1,
    name: "98 OVR Dream Team - Messi, Ronaldo & Haaland",
    price: 149.99,
    ovr: 98,
    gp: "12M",
    category: "Dream Team",
    description: "Premium account featuring 98 OVR squad with Messi, Ronaldo, and Haaland. Includes multiple Epic players and high GP balance.",
    players: "Messi, Ronaldo, Haaland, Mbappé, Neymar",
    loginMethod: "Email + Password",
    status: "Available",
    featured: true,
  },
  {
    id: 2,
    name: "eFootball 2026 - 15M GP + Full Epic Squad",
    price: 89.99,
    ovr: 95,
    gp: "15M",
    category: "High GP",
    description: "Massive GP balance with a strong Epic squad. Perfect for players who want to build their dream team quickly.",
    players: "Multiple Epic Cards",
    loginMethod: "Email + Password",
    status: "Available",
  },
  {
    id: 3,
    name: "God Tier Account - 105 OVR Big Time Players",
    price: 229.99,
    ovr: 105,
    gp: "8M",
    category: "Big Time",
    description: "God Tier account with multiple 105+ OVR Big Time players. One of the strongest accounts available.",
    players: "Big Time Ronaldo, Big Time Messi, Big Time Mbappé",
    loginMethod: "Email + Password",
    status: "Available",
    featured: true,
  },
];

function AccountDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundAccount = allAccounts.find(acc => acc.id === parseInt(id));

    if (foundAccount) {
      setAccount(foundAccount);
    } else {
      alert("Account not found!");
      navigate("/shop");
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <div className="loading">Loading account details...</div>;
  if (!account) return <div>Account not found</div>;

  return (
    <div className="account-detail-page">
      <div className="detail-container">
        <Link to="/shop" className="back-btn">← Back to Shop</Link>

        <div className="detail-content">
          {/* Left Side - Image / Visual */}
          <div className="detail-image">
            <div className="image-placeholder">
              ⚽️<br />
              <span>98 OVR Squad</span>
            </div>
            {account.featured && <div className="featured-badge">FEATURED</div>}
          </div>

          {/* Right Side - Details */}
          <div className="detail-info">
            <h1>{account.name}</h1>
            
            <div className="price-tag">
              💰 ${account.price}
            </div>

            <div className="info-grid">
              <div className="info-item">
                <strong>OVR</strong>
                <span>{account.ovr}</span>
              </div>
              <div className="info-item">
                <strong>GP</strong>
                <span>{account.gp}</span>
              </div>
              <div className="info-item">
                <strong>Category</strong>
                <span>{account.category}</span>
              </div>
              <div className="info-item">
                <strong>Status</strong>
                <span className="status-available">Available</span>
              </div>
            </div>

            <div className="description">
              <h3>Description</h3>
              <p>{account.description}</p>
            </div>

            <div className="key-players">
              <h3>Key Players</h3>
              <p>{account.players}</p>
            </div>

            <div className="login-info">
              <h3>Login Method</h3>
              <p>{account.loginMethod}</p>
            </div>

            <div className="action-buttons">
              <button className="btn btn-buy-full">
                Buy Now - ${account.price}
              </button>
              <button className="btn btn-secondary">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetail;