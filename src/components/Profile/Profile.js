import React, { useState, useEffect } from 'react';
import Individual from './Individual';
import Teams from './Teams';
import './Profile.css';

function Profile({ currentUser, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState('individual');

  const tabs = [
    { id: 'individual', label: 'Individual', icon: '👤' },
    { id: 'teams', label: 'Teams', icon: '🏆' }
  ];

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-header">
          <h1 className="page-title">Profile</h1>
          <p className="profile-subtitle">Manage your cricket profile and teams</p>
        </div>

        {/* Profile Tabs */}
        <div className="profile-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'individual' && (
            <Individual 
              currentUser={currentUser} 
              onUpdateUser={onUpdateUser}
            />
          )}
          {activeTab === 'teams' && (
            <Teams 
              currentUser={currentUser}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile; 