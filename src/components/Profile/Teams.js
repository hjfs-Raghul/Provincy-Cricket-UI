import React, { useState, useEffect } from 'react';
import { 
  getAllTeams, 
  getUserTeam, 
  createTeam, 
  addPlayerToTeam, 
  removePlayerFromTeam 
} from '../../data/mockTeams';
import { getAllUsers, searchUsers } from '../../data/mockUsers';
import './Teams.css';

function Teams({ currentUser }) {
  const [activeView, setActiveView] = useState('myteam');
  const [currentTeam, setCurrentTeam] = useState(null);
  const [allTeams, setAllTeams] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [playerSearch, setPlayerSearch] = useState('');
  const [teamFormData, setTeamFormData] = useState({
    name: '',
    description: '',
    location: '',
    teamColor: '#1a5f7a',
    logo: '🏏',
    isPublic: true,
    maxPlayers: 15,
    minAge: 16,
    maxAge: 40
  });

  useEffect(() => {
    loadTeamData();
  }, [currentUser]);

  const loadTeamData = () => {
    const teams = getAllTeams();
    setAllTeams(teams);
    
    const userTeam = getUserTeam(currentUser.id);
    setCurrentTeam(userTeam);
    
    // Load available players (those without teams)
    const users = getAllUsers();
    const playersWithoutTeams = users.filter(user => !user.currentTeam && user.id !== currentUser.id);
    setAvailablePlayers(playersWithoutTeams);
  };

  const views = [
    { id: 'myteam', label: 'My Team', icon: '👥' },
    { id: 'stats', label: 'Stats', icon: '📊' }
  ];

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    
    const newTeam = createTeam({
      ...teamFormData,
      captainName: currentUser.name,
      captainPlayerType: currentUser.playerType,
      captainBattingStyle: currentUser.battingStyle,
      captainBowlingStyle: currentUser.bowlingStyle
    }, currentUser.id);
    
    setCurrentTeam(newTeam);
    setShowCreateForm(false);
    setTeamFormData({
      name: '',
      description: '',
      location: '',
      teamColor: '#1a5f7a',
      logo: '🏏',
      isPublic: true,
      maxPlayers: 15,
      minAge: 16,
      maxAge: 40
    });
    
    loadTeamData();
  };

  const handleAddPlayer = (userId) => {
    const success = addPlayerToTeam(currentTeam.id, userId);
    if (success) {
      loadTeamData();
      setShowAddPlayer(false);
      setPlayerSearch('');
    }
  };

  const handleRemovePlayer = (userId) => {
    if (window.confirm('Are you sure you want to remove this player from the team?')) {
      const success = removePlayerFromTeam(currentTeam.id, userId);
      if (success) {
        loadTeamData();
      }
    }
  };

  const filteredPlayers = playerSearch 
    ? availablePlayers.filter(player => 
        player.name.toLowerCase().includes(playerSearch.toLowerCase()) ||
        player.city.toLowerCase().includes(playerSearch.toLowerCase()) ||
        player.mobile.includes(playerSearch)
      )
    : availablePlayers;

  const getPlayerTypeIcon = (type) => {
    const icons = {
      batsman: '🏏',
      bowler: '⚾',
      allrounder: '🎯',
      wicketkeeper: '🥅'
    };
    return icons[type] || '🏏';
  };

  const renderMyTeam = () => (
    <div className="my-team-view">
      {currentTeam ? (
        <div className="team-dashboard">
          {/* Team Header */}
          <div className="team-header">
            <div className="team-logo" style={{ backgroundColor: currentTeam.teamColor }}>
              {currentTeam.logo}
            </div>
            <div className="team-info">
              <h3>{currentTeam.name}</h3>
              <p className="team-description">{currentTeam.description}</p>
              <div className="team-meta">
                <span>📍 {currentTeam.location}</span>
                <span>📅 Est. {currentTeam.establishedDate}</span>
                <span>👥 {currentTeam.players.length}/{currentTeam.maxPlayers} Players</span>
              </div>
            </div>
            {currentTeam.captain === currentUser.id && (
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddPlayer(true)}
                disabled={currentTeam.players.length >= currentTeam.maxPlayers}
              >
                + Add Player
              </button>
            )}
          </div>

          {/* Team Players */}
          <div className="team-players">
            <h4>Team Players</h4>
            <div className="players-grid">
              {currentTeam.players.map(player => (
                <div key={player.userId} className="player-card">
                  <div className="player-header">
                    <span className="player-type-icon">
                      {getPlayerTypeIcon(player.playerType)}
                    </span>
                    <div className="player-info">
                      <h5>{player.name}</h5>
                      <span className="player-role">{player.role}</span>
                    </div>
                    {currentTeam.captain === currentUser.id && player.userId !== currentUser.id && (
                      <button 
                        className="remove-player-btn"
                        onClick={() => handleRemovePlayer(player.userId)}
                        title="Remove player"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div className="player-details">
                    <span>Type: {player.playerType}</span>
                    <span>Batting: {player.battingStyle}</span>
                    {player.bowlingStyle !== 'none' && (
                      <span>Bowling: {player.bowlingStyle}</span>
                    )}
                    <span>Joined: {player.joinedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Matches */}
          <div className="recent-matches">
            <h4>Recent Matches</h4>
            {currentTeam.recentMatches.length > 0 ? (
              <div className="matches-list">
                {currentTeam.recentMatches.map((match, index) => (
                  <div key={index} className={`match-item ${match.result.toLowerCase()}`}>
                    <div className="match-opponent">vs {match.opponent}</div>
                    <div className="match-result">{match.result}</div>
                    <div className="match-score">{match.score}</div>
                    <div className="match-date">{match.date}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-matches">No matches played yet</p>
            )}
          </div>
        </div>
      ) : (
        <div className="no-team">
          <div className="no-team-icon">🏏</div>
          <h3>Join or Create a Team!</h3>
          <p>You're not currently part of any team. Create your own team or join an existing one to start playing matches together.</p>
          
          <div className="team-actions">
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateForm(true)}
            >
              <span>🏆</span>
              Create Team
            </button>
            <button className="btn btn-secondary">
              <span>🔍</span>
              Browse Teams
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderStats = () => (
    <div className="stats-view">
      <h3>Team Statistics</h3>
      
      {currentTeam ? (
        <div className="team-stats">
          {/* Overall Stats */}
          <div className="stats-section">
            <h4>Overall Performance</h4>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{currentTeam.stats.matchesPlayed}</div>
                <div className="stat-label">Matches Played</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{currentTeam.stats.won}</div>
                <div className="stat-label">Won</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{currentTeam.stats.lost}</div>
                <div className="stat-label">Lost</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{currentTeam.stats.tied}</div>
                <div className="stat-label">Tied</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{currentTeam.stats.winPercentage}%</div>
                <div className="stat-label">Win Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{currentTeam.stats.totalRuns}</div>
                <div className="stat-label">Total Runs</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{currentTeam.stats.totalWickets}</div>
                <div className="stat-label">Total Wickets</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{currentTeam.stats.averageScore}</div>
                <div className="stat-label">Avg Score</div>
              </div>
            </div>
          </div>

          {/* Records */}
          <div className="stats-section">
            <h4>Team Records</h4>
            <div className="records-grid">
              <div className="record-item">
                <span className="record-label">Highest Score:</span>
                <span className="record-value">{currentTeam.stats.highestScore}</span>
              </div>
              <div className="record-item">
                <span className="record-label">Lowest Score:</span>
                <span className="record-value">{currentTeam.stats.lowestScore}</span>
              </div>
            </div>
          </div>

          {/* Player Types Distribution */}
          <div className="stats-section">
            <h4>Squad Composition</h4>
            <div className="composition-stats">
              {['batsman', 'bowler', 'allrounder', 'wicketkeeper'].map(type => {
                const count = currentTeam.players.filter(p => p.playerType === type).length;
                const percentage = ((count / currentTeam.players.length) * 100).toFixed(1);
                return (
                  <div key={type} className="composition-item">
                    <span className="comp-icon">{getPlayerTypeIcon(type)}</span>
                    <span className="comp-type">{type}</span>
                    <span className="comp-count">{count} ({percentage}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-stats">
          <p>Join a team to view statistics</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="teams-section">
      {/* View Tabs */}
      <div className="teams-tabs">
        {views.map(view => (
          <button
            key={view.id}
            className={`teams-tab ${activeView === view.id ? 'active' : ''}`}
            onClick={() => setActiveView(view.id)}
          >
            <span className="tab-icon">{view.icon}</span>
            <span className="tab-label">{view.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="teams-content">
        {activeView === 'myteam' && renderMyTeam()}
        {activeView === 'stats' && renderStats()}
      </div>

      {/* Create Team Modal */}
      {showCreateForm && (
        <div className="modal-overlay">
          <div className="create-team-modal">
            <div className="modal-header">
              <h3>Create New Team</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCreateForm(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCreateTeam} className="team-form">
              <div className="form-group">
                <label>Team Name *</label>
                <input
                  type="text"
                  value={teamFormData.name}
                  onChange={(e) => setTeamFormData({...teamFormData, name: e.target.value})}
                  required
                  placeholder="Enter team name"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={teamFormData.description}
                  onChange={(e) => setTeamFormData({...teamFormData, description: e.target.value})}
                  placeholder="Brief description of your team"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    value={teamFormData.location}
                    onChange={(e) => setTeamFormData({...teamFormData, location: e.target.value})}
                    required
                    placeholder="City/Location"
                  />
                </div>

                <div className="form-group">
                  <label>Max Players</label>
                  <select
                    value={teamFormData.maxPlayers}
                    onChange={(e) => setTeamFormData({...teamFormData, maxPlayers: parseInt(e.target.value)})}
                  >
                    <option value="11">11 Players</option>
                    <option value="15">15 Players</option>
                    <option value="20">20 Players</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Team Color</label>
                  <input
                    type="color"
                    value={teamFormData.teamColor}
                    onChange={(e) => setTeamFormData({...teamFormData, teamColor: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Team Logo</label>
                  <select
                    value={teamFormData.logo}
                    onChange={(e) => setTeamFormData({...teamFormData, logo: e.target.value})}
                  >
                    <option value="🏏">🏏 Cricket</option>
                    <option value="⚡">⚡ Thunder</option>
                    <option value="🔥">🔥 Fire</option>
                    <option value="🏆">🏆 Trophy</option>
                    <option value="⭐">⭐ Star</option>
                    <option value="💎">💎 Diamond</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Player Modal */}
      {showAddPlayer && (
        <div className="modal-overlay">
          <div className="add-player-modal">
            <div className="modal-header">
              <h3>Add Player to {currentTeam?.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddPlayer(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="player-search">
              <input
                type="text"
                value={playerSearch}
                onChange={(e) => setPlayerSearch(e.target.value)}
                placeholder="Search players by name, city, or mobile..."
                className="search-input"
              />
            </div>

            <div className="available-players">
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map(player => (
                  <div key={player.id} className="available-player-card">
                    <img 
                      src={player.avatar} 
                      alt={player.name}
                      className="player-avatar"
                    />
                    <div className="player-info">
                      <h5>{player.name}</h5>
                      <span className="player-type">{getPlayerTypeIcon(player.playerType)} {player.playerType}</span>
                      <span className="player-location">📍 {player.city}</span>
                      <span className="player-experience">📊 {player.experience}</span>
                    </div>
                    <button 
                      className="btn btn-success btn-sm"
                      onClick={() => handleAddPlayer(player.id)}
                    >
                      Add
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-players">No available players found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams; 