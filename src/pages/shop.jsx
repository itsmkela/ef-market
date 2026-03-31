import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./shop.css";

const allAccounts = [
  {
    id: 1,
    name: "98 OVR Dream Team - Messi, Ronaldo & Haaland",
    price: 149.99,
    ovr: 98,
    gp: "12M",
    category: "Dream Team",
    featured: true,
    image: "⚽",
  },
  {
    id: 2,
    name: "eFootball 2026 - 15M GP + Full Epic Squad",
    price: 89.99,
    ovr: 95,
    gp: "15M",
    category: "High GP",
    featured: true,
  },
  {
    id: 3,
    name: "God Tier Account - 105 OVR Big Time Players",
    price: 229.99,
    ovr: 105,
    gp: "8M",
    category: "Big Time",
    featured: true,
  },
  {
    id: 4,
    name: "Legendary Squad - 97 OVR with Epic Boosters",
    price: 119.99,
    ovr: 97,
    gp: "10M",
    category: "Epic",
  },
  {
    id: 5,
    name: "Fresh Starter Account - High Rated Players",
    price: 24.99,
    ovr: 88,
    gp: "2M",
    category: "Starter",
  },
  {
    id: 6,
    name: "Premium Account - 100 OVR with Ronaldo & Mbappé",
    price: 179.99,
    ovr: 100,
    gp: "14M",
    category: "Premium",
  },
];

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("price-low");

  const filteredAccounts = allAccounts
    .filter((account) => {
      const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || account.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "ovr-high") return b.ovr - a.ovr;
      return 0;
    });

  const categories = ["All", "Dream Team", "High GP", "Big Time", "Epic", "Premium", "Starter"];

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Browse eFootball Accounts</h1>
        <p>Find your perfect squad • Instant delivery • Secure transfer</p>
      </div>

      {/* Sell Your Account Button - Prominent at the top */}
      <div className="sell-banner">
        <div className="sell-content">
          <div className="sell-text">
            <h2>Want to Sell Your eFootball Account?</h2>
            <p>Got a high OVR squad or lots of GP? Earn money by selling your account safely.</p>
          </div>
          <Link to="/sell" className="btn btn-sell" onClick={(e) => {
    // Simple check - you can improve this later with real auth
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      e.preventDefault();
      alert("Please login first to sell an account");
      window.location.href = "/login?redirect=/sell";
    }
  }}
> Sell Your Account Now
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search accounts (e.g. Messi, Ronaldo, 98 OVR...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-options">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="ovr-high">OVR: Highest First</option>
          </select>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="accounts-grid">
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map((account) => (
            <div key={account.id} className="account-card">
              {account.featured && <div className="card-badge">FEATURED</div>}

              <div className="account-icon">{account.image || "⚽"}</div>

              <h3>{account.name}</h3>

              <div className="account-stats">
                <span><strong>OVR:</strong> {account.ovr}</span>
                <span><strong>GP:</strong> {account.gp}</span>
              </div>

              <div className="price">💰 ${account.price}</div>

              <div className="account-buttons">
                <Link 
                  to={`/account/${account.id}`} 
                  className="btn btn-details"
                >
                  View Details
                </Link>
                
                <Link 
                  to={`/buy/${account.id}`} 
                  className="btn btn-buy"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No accounts found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default Shop;