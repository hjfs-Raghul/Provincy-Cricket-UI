import React, { useState } from 'react';
import { updateUser } from '../../data/mockUsers';
import './Individual.css';

function Individual({ currentUser, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // Provide default stats if undefined
  const stats = currentUser?.stats || {
    matchesPlayed: 0,
    runsScored: 0,
    wicketsTaken: 0,
    catches: 0,
    bestScore: 0,
    bestBowling: '0/0',
    average: '0.00',
    strikeRate: '0.00'
  };

  const playerTypeLabels = {
    batsman: 'Batsman',
    bowler: 'Bowler',
    allrounder: 'All-rounder',
    wicketkeeper: 'Wicket Keeper'
  };

  const battingStyleLabels = {
    right: 'Right Handed',
    left: 'Left Handed'
  };

  const bowlingStyleLabels = {
    'right-fast': 'Right Arm Fast',
    'left-fast': 'Left Arm Fast',
    'right-spin': 'Right Arm Spin',
    'left-spin': 'Left Arm Spin',
    'none': 'Non-bowler'
  };

  const experienceLabels = {
    beginner: 'Beginner (0-2 years)',
    intermediate: 'Intermediate (2-5 years)',
    experienced: 'Experienced (5-10 years)',
    professional: 'Professional (10+ years)'
  };

  const handleEdit = () => {
    setEditData({
      name: currentUser.name,
      city: currentUser.city,
      favoriteTeam: currentUser.favoriteTeam,
      experience: currentUser.experience
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedUser = updateUser(currentUser.id, editData);
      if (updatedUser) {
        onUpdateUser(updatedUser);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancel = () => {
    setEditData({});
    setIsEditing(false);
  };

  const getAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="individual-profile">
      {/* Profile Header */}
      <div className="profile-card">
        <div className="profile-avatar-section">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            className="profile-avatar"
          />
          <div className="profile-basic-info">
            {isEditing ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                className="edit-input name-input"
              />
            ) : (
              <h2 className="profile-name">{currentUser.name}</h2>
            )}
            <p className="profile-mobile">{currentUser.mobile}</p>
            <p className="profile-member-since">
              Member since {new Date(currentUser.registeredAt).toLocaleDateString()}
            </p>
          </div>
          <div className="profile-actions">
            {isEditing ? (
              <div className="edit-actions">
                <button className="btn btn-success" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleEdit}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cricket Profile */}
      <div className="profile-section">
        <h3 className="section-title">Cricket Profile</h3>
        <div className="cricket-profile-grid">
          <div className="profile-item">
            <span className="item-icon">🏏</span>
            <div className="item-content">
              <span className="item-label">Player Type</span>
              <span className="item-value">{playerTypeLabels[currentUser.playerType] || 'Not specified'}</span>
            </div>
          </div>

          <div className="profile-item">
            <span className="item-icon">👉</span>
            <div className="item-content">
              <span className="item-label">Batting Style</span>
              <span className="item-value">{battingStyleLabels[currentUser.battingStyle] || 'Not specified'}</span>
            </div>
          </div>

          {currentUser.bowlingStyle && currentUser.bowlingStyle !== 'none' && (
            <div className="profile-item">
              <span className="item-icon">⚾</span>
              <div className="item-content">
                <span className="item-label">Bowling Style</span>
                <span className="item-value">{bowlingStyleLabels[currentUser.bowlingStyle] || 'Not specified'}</span>
              </div>
            </div>
          )}

          <div className="profile-item">
            <span className="item-icon">📊</span>
            <div className="item-content">
              <span className="item-label">Experience</span>
              {isEditing ? (
                <select
                  value={editData.experience}
                  onChange={(e) => setEditData({...editData, experience: e.target.value})}
                  className="edit-select"
                >
                  <option value="beginner">Beginner (0-2 years)</option>
                  <option value="intermediate">Intermediate (2-5 years)</option>
                  <option value="experienced">Experienced (5-10 years)</option>
                  <option value="professional">Professional (10+ years)</option>
                </select>
              ) : (
                <span className="item-value">{experienceLabels[currentUser.experience] || 'Not specified'}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="profile-section">
        <h3 className="section-title">Personal Information</h3>
        <div className="personal-info-grid">
          <div className="profile-item">
            <span className="item-icon">🎂</span>
            <div className="item-content">
              <span className="item-label">Age</span>
              <span className="item-value">{getAge(currentUser.dateOfBirth)} years</span>
            </div>
          </div>

          <div className="profile-item">
            <span className="item-icon">🏙️</span>
            <div className="item-content">
              <span className="item-label">City</span>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.city}
                  onChange={(e) => setEditData({...editData, city: e.target.value})}
                  className="edit-input"
                />
              ) : (
                <span className="item-value">{currentUser.city || 'Not specified'}</span>
              )}
            </div>
          </div>

          <div className="profile-item">
            <span className="item-icon">⭐</span>
            <div className="item-content">
              <span className="item-label">Favorite Team</span>
              {isEditing ? (
                <select
                  value={editData.favoriteTeam}
                  onChange={(e) => setEditData({...editData, favoriteTeam: e.target.value})}
                  className="edit-select"
                >
                  <option value="Mumbai Indians">Mumbai Indians</option>
                  <option value="Chennai Super Kings">Chennai Super Kings</option>
                  <option value="Royal Challengers Bangalore">Royal Challengers Bangalore</option>
                  <option value="Delhi Capitals">Delhi Capitals</option>
                  <option value="Kolkata Knight Riders">Kolkata Knight Riders</option>
                  <option value="Punjab Kings">Punjab Kings</option>
                  <option value="Rajasthan Royals">Rajasthan Royals</option>
                  <option value="Sunrisers Hyderabad">Sunrisers Hyderabad</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <span className="item-value">{currentUser.favoriteTeam || 'Not specified'}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cricket Statistics */}
      <div className="profile-section">
        <h3 className="section-title">Cricket Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.matchesPlayed}</div>
            <div className="stat-label">Matches Played</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.runsScored}</div>
            <div className="stat-label">Runs Scored</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.wicketsTaken}</div>
            <div className="stat-label">Wickets Taken</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.catches}</div>
            <div className="stat-label">Catches</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.bestScore}</div>
            <div className="stat-label">Best Score</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.bestBowling}</div>
            <div className="stat-label">Best Bowling</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.average}</div>
            <div className="stat-label">Batting Average</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.strikeRate}</div>
            <div className="stat-label">Strike Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Individual; 