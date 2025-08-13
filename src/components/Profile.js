import React from 'react';
import './Profile.css';

function Profile() {
  const userStats = {
    favoriteTeam: 'Mumbai Indians',
    matchesWatched: 47,
    predictionsCorrect: 32,
    memberSince: 'Jan 2024'
  };

  const menuItems = [
    { icon: '⭐', label: 'Favorite Teams', action: 'favorites' },
    { icon: '🔔', label: 'Notifications', action: 'notifications' },
    { icon: '🎯', label: 'Predictions', action: 'predictions' },
    { icon: '📊', label: 'Statistics', action: 'stats' },
    { icon: '⚙️', label: 'Settings', action: 'settings' },
    { icon: '❓', label: 'Help & Support', action: 'help' },
    { icon: '📄', label: 'Terms & Privacy', action: 'terms' },
    { icon: '🚪', label: 'Sign Out', action: 'signout' }
  ];

  const handleMenuClick = (action) => {
    // Handle menu actions
    console.log(`Clicked: ${action}`);
  };

  return (
    <div className="profile">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">Cricket Fan</h2>
            <p className="profile-email">fan@cricketapp.com</p>
            <p className="member-since">Member since {userStats.memberSince}</p>
          </div>
          <button className="edit-profile-btn">
            <span>✏️</span>
          </button>
        </div>

        {/* User Stats */}
        <div className="user-stats">
          <div className="stat-card-profile">
            <div className="stat-icon">🏏</div>
            <div className="stat-info">
              <div className="stat-number">{userStats.matchesWatched}</div>
              <div className="stat-label">Matches Watched</div>
            </div>
          </div>
          
          <div className="stat-card-profile">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <div className="stat-number">{userStats.predictionsCorrect}</div>
              <div className="stat-label">Correct Predictions</div>
            </div>
          </div>
          
          <div className="stat-card-profile">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <div className="stat-text">{userStats.favoriteTeam}</div>
              <div className="stat-label">Favorite Team</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="profile-menu">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="menu-item"
              onClick={() => handleMenuClick(item.action)}
            >
              <div className="menu-item-left">
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </div>
              <span className="menu-arrow">›</span>
            </button>
          ))}
        </div>

        {/* App Info */}
        <div className="app-info">
          <div className="app-version">
            <p>Provincial Cricket App v1.0.0</p>
            <p>Made with ❤️ for cricket fans</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 