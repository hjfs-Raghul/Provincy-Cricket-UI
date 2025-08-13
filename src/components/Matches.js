import React, { useState } from 'react';
import './Matches.css';

function Matches() {
  const [activeFilter, setActiveFilter] = useState('all');

  const matches = [
    {
      id: 1,
      team1: 'Punjab Kings',
      team2: 'Mumbai Indians',
      score1: '186/7',
      score2: '189/4',
      overs1: '20',
      overs2: '19.3',
      status: 'Completed',
      result: 'MI won by 6 wickets',
      date: '2024-01-15',
      venue: 'Wankhede Stadium',
      category: 'recent'
    },
    {
      id: 2,
      team1: 'Delhi Capitals',
      team2: 'Chennai Super Kings',
      score1: '156/8',
      score2: '89/3',
      overs1: '20',
      overs2: '12.2',
      status: 'Live',
      result: 'CSK need 68 runs in 46 balls',
      date: '2024-01-16',
      venue: 'Feroz Shah Kotla',
      category: 'live'
    },
    {
      id: 3,
      team1: 'Royal Challengers',
      team2: 'Kolkata Knight Riders',
      status: 'Upcoming',
      result: 'Match starts in 2 hours',
      date: '2024-01-16',
      time: '7:30 PM',
      venue: 'M. Chinnaswamy Stadium',
      category: 'upcoming'
    },
    {
      id: 4,
      team1: 'Rajasthan Royals',
      team2: 'Sunrisers Hyderabad',
      status: 'Upcoming',
      result: 'Tomorrow at 3:30 PM',
      date: '2024-01-17',
      time: '3:30 PM',
      venue: 'Sawai Mansingh Stadium',
      category: 'upcoming'
    }
  ];

  const filters = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'live', label: 'Live', icon: '🔴' },
    { id: 'upcoming', label: 'Upcoming', icon: '⏰' },
    { id: 'recent', label: 'Recent', icon: '📊' }
  ];

  const filteredMatches = activeFilter === 'all' 
    ? matches 
    : matches.filter(match => match.category === activeFilter);

  return (
    <div className="matches">
      <div className="container">
        <h1 className="page-title">Matches</h1>
        
        {/* Filter Tabs */}
        <div className="filter-tabs">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span className="filter-icon">{filter.icon}</span>
              <span className="filter-label">{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Matches List */}
        <div className="matches-list">
          {filteredMatches.map(match => (
            <div key={match.id} className={`detailed-match-card ${match.category}`}>
              <div className="match-header">
                <div className="match-date-venue">
                  <span className="match-date">{match.date}</span>
                  {match.time && <span className="match-time">{match.time}</span>}
                  <span className="match-venue">{match.venue}</span>
                </div>
                <div className={`match-status-badge ${match.category}`}>
                  {match.status}
                </div>
              </div>

              <div className="match-teams-detailed">
                <div className="team-detailed">
                  <div className="team-name-detailed">{match.team1}</div>
                  {match.score1 && (
                    <div className="team-score-detailed">
                      {match.score1} <span className="overs">({match.overs1} ov)</span>
                    </div>
                  )}
                </div>
                
                <div className="vs-detailed">VS</div>
                
                <div className="team-detailed">
                  <div className="team-name-detailed">{match.team2}</div>
                  {match.score2 && (
                    <div className="team-score-detailed">
                      {match.score2} <span className="overs">({match.overs2} ov)</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="match-result">
                {match.result}
              </div>

              {match.category === 'live' && (
                <div className="live-actions">
                  <button className="btn btn-primary">Watch Live</button>
                  <button className="btn btn-secondary">Ball by Ball</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="no-matches">
            <span className="no-matches-icon">🏏</span>
            <h3>No matches found</h3>
            <p>No matches in the {activeFilter} category</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Matches; 