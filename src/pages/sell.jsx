import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sell.css";

function Sell() {
  const [formData, setFormData] = useState({
    accountName: "",
    ovr: "",
    gp: "",
    price: "",
    category: "Dream Team",
    description: "",
    email: "",
    contactMethod: "email",
    squadImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection (from click or drop)
  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, squadImage: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image file (JPG, PNG, etc.)");
    }
  };

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    document.getElementById("squadImage").click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, squadImage: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.squadImage) {
      alert("Please upload a squad screenshot");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      console.log("Submitted data:", formData);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="sell-page">
        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">✅</div>
            <h2>Account Submitted Successfully!</h2>
            <p>Our team will review your account and squad photo within 24 hours.</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.href = "/shop"}
            >
              Back to Browse Accounts
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sell-page">
      <div className="sell-header">
        <h1>Sell Your eFootball Account</h1>
        <p>Earn money by selling your high OVR squad safely and quickly</p>
      </div>

      <div className="sell-form-container">
        <form onSubmit={handleSubmit} className="sell-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Account Name / Title</label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                placeholder="e.g. 98 OVR Dream Team with Messi & Ronaldo"
                required
              />
            </div>

            <div className="form-group">
              <label>Overall Rating (OVR)</label>
              <input
                type="number"
                name="ovr"
                value={formData.ovr}
                onChange={handleChange}
                placeholder="98"
                min="80"
                max="110"
                required
              />
            </div>

            <div className="form-group">
              <label>GP Amount</label>
              <input
                type="text"
                name="gp"
                value={formData.gp}
                onChange={handleChange}
                placeholder="e.g. 12M"
                required
              />
            </div>

            <div className="form-group">
              <label>Your Asking Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="149.99"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="Dream Team">Dream Team</option>
                <option value="High GP">High GP</option>
                <option value="Big Time">Big Time</option>
                <option value="Epic">Epic</option>
                <option value="Premium">Premium</option>
                <option value="Starter">Starter</option>
              </select>
            </div>

            <div className="form-group">
              <label>Your Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Contact Method</label>
              <select name="contactMethod" value={formData.contactMethod} onChange={handleChange}>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="form-group full-width">
            <label>Upload Squad Photo (Screenshot of your team)</label>
            
            <div 
              className={`image-upload-area ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <input
                type="file"
                id="squadImage"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />

              {!imagePreview ? (
                <div className="upload-placeholder">
                  <div className="upload-icon">📸</div>
                  <p>Drag & drop your squad screenshot here</p>
                  <span>or</span>
                  <p className="click-text">Click to browse from your device</p>
                  <small>Supported: JPG, PNG, WebP (Max 5MB)</small>
                </div>
              ) : (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Squad Preview" />
                  <button 
                    type="button"
                    className="remove-image-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form-group full-width">
            <label>Account Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your account: key players, special cards, login method, etc."
              rows="6"
              required
            />
          </div>

          <div className="form-note">
            <strong>Note:</strong> A clear screenshot of your squad helps us verify and approve your account faster.
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading || !formData.squadImage}
          >
            {loading ? "Submitting Account..." : "Submit Account for Review"}
          </button>

          {/* Back to Home Button - Added at the bottom */}
          <Link to="/" className="back-home-btn">
            ← Back to Home
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Sell;