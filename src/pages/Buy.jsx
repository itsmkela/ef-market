import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./buy.css";

const allAccounts = [
  {
    id: 1,
    name: "98 OVR Dream Team - Messi, Ronaldo & Haaland",
    price: 149.99,
    ovr: 98,
    gp: "12M",
    category: "Dream Team",
    description: "Premium account featuring 98 OVR squad with Messi, Ronaldo, and Haaland.",
  },
  {
    id: 2,
    name: "eFootball 2026 - 15M GP + Full Epic Squad",
    price: 89.99,
    ovr: 95,
    gp: "15M",
    category: "High GP",
    description: "Massive GP balance with a strong Epic squad.",
  },
  {
    id: 3,
    name: "God Tier Account - 105 OVR Big Time Players",
    price: 229.99,
    ovr: 105,
    gp: "8M",
    category: "Big Time",
    description: "God Tier account with multiple 105+ OVR Big Time players.",
  },
];

function Buy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handlePurchase = () => {
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setShowSuccess(true);
    }, 1800);
  };

  if (loading) return <div className="loading">Loading account...</div>;
  if (!account) return null;

  if (showSuccess) {
    return (
      <div className="buy-page">
        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">🎉</div>
            <h2>Purchase Successful!</h2>
            <p>You have successfully purchased:</p>
            <h3>{account.name}</h3>
            
            <div className="success-info">
              <p><strong>Account Details have been sent to your email.</strong></p>
              <p>Check your inbox (including spam folder) for login credentials.</p>
            </div>

            <div className="success-buttons">
              <Link to="/dashboard" className="btn btn-primary">
                Go to My Dashboard
              </Link>
              <Link to="/shop" className="btn btn-secondary">
                Browse More Accounts
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="buy-page">
      <div className="buy-container">
        <Link to={`/account/${id}`} className="back-btn">← Back to Account Details</Link>

        <div className="buy-content">
          <div className="buy-summary">
            <h1>Checkout</h1>
            <div className="account-summary">
              <h2>{account.name}</h2>
              <div className="price-large">${account.price}</div>
            </div>

            <div className="summary-details">
              <div className="detail-row">
                <span>OVR</span>
                <span>{account.ovr}</span>
              </div>
              <div className="detail-row">
                <span>GP</span>
                <span>{account.gp}</span>
              </div>
              <div className="detail-row">
                <span>Category</span>
                <span>{account.category}</span>
              </div>
            </div>
          </div>

          <div className="payment-section">
            <h3>Payment Information</h3>
            
            <div className="payment-form">
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="4242 4242 4242 4242" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" maxLength="4" />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" />
              </div>
            </div>

            <div className="total-section">
              <div className="total-row">
                <span>Total</span>
                <span className="total-price">${account.price}</span>
              </div>
            </div>

            <button 
              className="btn btn-buy-now"
              onClick={handlePurchase}
              disabled={processing}
            >
              {processing ? "Processing Payment..." : `Pay $${account.price} Now`}
            </button>

            <p className="secure-note">
              🔒 Secure payment powered by Stripe • Instant delivery after payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;