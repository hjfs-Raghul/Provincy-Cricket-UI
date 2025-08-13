import React from 'react';
import './Teams.css';

function Teams() {
  const standings = [
    {
      position: 1,
      team: 'Mumbai Indians',
      matches: 10,
      won: 8,
      lost: 2,
      points: 16,
      nrr: '+0.85',
      form: ['W', 'W', 'W', 'L', 'W']
    },
    {
      position: 2,
      team: 'Chennai Super Kings',
      matches: 10,
      won: 7,
      lost: 3,
      points: 14,
      nrr: '+0.42',
      form: ['W', 'L', 'W', 'W', 'W']
    },
    {
      position: 3,
      team: 'Delhi Capitals',
      matches: 9,
      won: 6,
      lost: 3,
      points: 12,
      nrr: '+0.28',
      form: ['L', 'W', 'W', 'L', 'W']
    },
    {
      position: 4,
      team: 'Royal Challengers',
      matches: 10,
      won: 5,
      lost: 5,
      points: 10,
      nrr: '-0.15',
      form: ['L', 'L', 'W', 'W', 'L']
    },
    {
      position: 5,
      team: 'Punjab Kings',
      matches: 9,
      won: 4,
      lost: 5,
      points: 8,
      nrr: '-0.33',
      form: ['W', 'L', 'L', 'W', 'L']
    },
    {
      position: 6,
      team: 'Kolkata Knight Riders',
      matches: 9,
      won: 3,
      lost: 6,
      points: 6,
      nrr: '-0.52',
      form: ['L', 'L', 'L', 'W', 'L']
    },
    {
      position: 7,
      team: 'Rajasthan Royals',
      matches: 10,
      won: 3,
      lost: 7,
      points: 6,
      nrr: '-0.71',
      form: ['L', 'W', 'L', 'L', 'L']
    },
    {
      position: 8,
      team: 'Sunrisers Hyderabad',
      matches: 9,
      won: 2,
      lost: 7,
      points: 4,
      nrr: '-0.89',
      form: ['L', 'L', 'W', 'L', 'L']
    }
  ];

  const getPositionStyle = (position) => {
    if (position <= 4) return 'qualified';
    if (position <= 6) return 'middle';
    return 'eliminated';
  };

  const getFormIcon = (result) => {
    return result === 'W' ? '✅' : '❌';
  };

  return (
    <div className="teams">
      <div className="container">
        <h1 className="page-title">Teams & Standings</h1>
        
        {/* Legend */}
        <div className="legend">
          <div className="legend-item qualified">
            <span className="legend-dot"></span>
            <span>Playoffs (Top 4)</span>
          </div>
          <div className="legend-item eliminated">
            <span className="legend-dot"></span>
            <span>Eliminated</span>
          </div>
        </div>

        {/* Standings Table */}
        <div className="standings-table">
          <div className="table-header">
            <div className="position-col">Pos</div>
            <div className="team-col">Team</div>
            <div className="matches-col">M</div>
            <div className="won-col">W</div>
            <div className="lost-col">L</div>
            <div className="points-col">Pts</div>
            <div className="nrr-col">NRR</div>
            <div className="form-col">Form</div>
          </div>

          {standings.map(team => (
            <div key={team.position} className={`table-row ${getPositionStyle(team.position)}`}>
              <div className="position-col">
                <span className="position-number">{team.position}</span>
              </div>
              <div className="team-col">
                <span className="team-name">{team.team}</span>
              </div>
              <div className="matches-col">{team.matches}</div>
              <div className="won-col">{team.won}</div>
              <div className="lost-col">{team.lost}</div>
              <div className="points-col">
                <span className="points-number">{team.points}</span>
              </div>
              <div className="nrr-col">
                <span className={`nrr ${team.nrr.includes('+') ? 'positive' : 'negative'}`}>
                  {team.nrr}
                </span>
              </div>
              <div className="form-col">
                <div className="form-icons">
                  {team.form.map((result, index) => (
                    <span key={index} className={`form-icon ${result.toLowerCase()}`}>
                      {getFormIcon(result)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="stats-summary">
          <div className="stat-item">
            <div className="stat-number">{standings.reduce((total, team) => total + team.matches, 0)}</div>
            <div className="stat-label">Total Matches</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">Playoff Spots</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{standings.length}</div>
            <div className="stat-label">Teams</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teams; 