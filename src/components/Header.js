import React, { useState } from 'react';
import './Header.css';

function Header({ currentUser, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    setShowUserMenu(false);
    onLogout();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🏏</span>
            <h1>Provincial Cricket</h1>
          </div>
          <div className="header-actions">
            {currentUser ? (
              <div className="user-menu">
                <button 
                  className="user-profile-btn touch-target"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="user-avatar"
                  />
                  <span className="user-name">{currentUser.name}</span>
                  <span className="dropdown-arrow">▾</span>
                </button>
                
                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.name}
                        className="dropdown-avatar"
                      />
                      <div>
                        <div className="dropdown-name">{currentUser.name}</div>
                        <div className="dropdown-mobile">{currentUser.mobile}</div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <span className="item-icon">🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="notification-btn touch-target">
                <span className="notification-icon">🔔</span>
                <span className="notification-badge">3</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Overlay to close dropdown */}
      {showUserMenu && (
        <div 
          className="dropdown-overlay"
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </header>
  );
}

export default Header; 