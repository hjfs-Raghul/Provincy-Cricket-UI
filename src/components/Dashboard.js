import React from 'react';
import './Dashboard.css';

function Dashboard() {
  const recentMatches = [
    {
      id: 1,
      team1: 'Punjab Kings',
      team2: 'Mumbai Indians',
      score1: '186/7',
      score2: '189/4',
      overs1: '20',
      overs2: '19.3',
      status: 'MI won by 6 wickets',
      isLive: false
    },
    {
      id: 2,
      team1: 'Delhi Capitals',
      team2: 'Chennai Super Kings',
      score1: '156/8',
      score2: '89/3',
      overs1: '20',
      overs2: '12.2',
      status: 'Live - CSK need 68 runs',
      isLive: true
    }
  ];

  const upcomingMatches = [
    {
      id: 3,
      team1: 'Royal Challengers',
      team2: 'Kolkata Knight Riders',
      date: 'Today, 7:30 PM',
      venue: 'M. Chinnaswamy Stadium'
    },
    {
      id: 4,
      team1: 'Rajasthan Royals',
      team2: 'Sunrisers Hyderabad',
      date: 'Tomorrow, 3:30 PM',
      venue: 'Sawai Mansingh Stadium'
    }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-number">24</div>
            <div className="stat-label">Matches Played</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">8</div>
            <div className="stat-label">Teams</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">156</div>
            <div className="stat-label">Total Runs</div>
          </div>
        </div>

        {/* Live/Recent Matches */}
        <section className="matches-section">
          <h2 className="section-title">Recent Matches</h2>
          {recentMatches.map(match => (
            <div key={match.id} className={`match-card ${match.isLive ? 'live' : ''}`}>
              {match.isLive && <div className="live-indicator">LIVE</div>}
              <div className="match-teams">
                <div className="team">
                  <span className="team-name">{match.team1}</span>
                  <span className="team-score">{match.score1} ({match.overs1})</span>
                </div>
                <div className="vs">vs</div>
                <div className="team">
                  <span className="team-name">{match.team2}</span>
                  <span className="team-score">{match.score2} ({match.overs2})</span>
                </div>
              </div>
              <div className="match-status">{match.status}</div>
            </div>
          ))}
        </section>

        {/* Upcoming Matches */}
        <section className="matches-section">
          <h2 className="section-title">Upcoming Matches</h2>
          {upcomingMatches.map(match => (
            <div key={match.id} className="match-card upcoming">
              <div className="match-teams">
                <div className="team">
                  <span className="team-name">{match.team1}</span>
                </div>
                <div className="vs">vs</div>
                <div className="team">
                  <span className="team-name">{match.team2}</span>
                </div>
              </div>
              <div className="match-details">
                <div className="match-time">{match.date}</div>
                <div className="match-venue">{match.venue}</div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Dashboard; 