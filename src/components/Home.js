import React, { useState } from 'react';
import StartMatchForm from './StartMatchForm';
import ScorerApp from './ScorerApp';
import './Home.css';

function Home() {
  const [showStartForm, setShowStartForm] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);

  const topMatches = [
    {
      id: 1,
      team1: 'Punjab Kings',
      team2: 'Mumbai Indians',
      score1: '186/7',
      score2: '189/4',
      overs1: '20',
      overs2: '19.3',
      status: 'MI won by 6 wickets',
      category: 'recent',
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
      category: 'live',
      isLive: true
    },
    {
      id: 3,
      team1: 'Royal Challengers',
      team2: 'Kolkata Knight Riders',
      status: 'Today, 7:30 PM • M. Chinnaswamy',
      category: 'upcoming',
      isLive: false
    },
    {
      id: 4,
      team1: 'Rajasthan Royals',
      team2: 'Sunrisers Hyderabad',
      status: 'Tomorrow, 3:30 PM • SMS Stadium',
      category: 'upcoming',
      isLive: false
    },
    {
      id: 5,
      team1: 'Lucknow Super Giants',
      team2: 'Gujarat Titans',
      score1: '172/6',
      score2: '171/9',
      overs1: '20',
      overs2: '20',
      status: 'LSG won by 1 run',
      category: 'recent',
      isLive: false
    },
    {
      id: 6,
      team1: 'Sunrisers Eastern',
      team2: 'Pretoria Capitals',
      status: 'Saturday, 7:00 PM • Kingsmead',
      category: 'upcoming',
      isLive: false
    }
  ];

  const posts = [
    {
      id: 1,
      author: 'Aman Verma',
      team: 'Punjab Kings',
      time: '2h',
      content: 'What a nail-biter last night! That final over had me on the edge of my seat. Brilliant death bowling to seal it.'
    },
    {
      id: 2,
      author: 'Neha Singh',
      team: 'Mumbai Indians',
      time: '3h',
      content: 'Powerplay batting was top notch. Loved the intent and strike rotation. This is the template!'
    },
    {
      id: 3,
      author: 'Rahul Iyer',
      team: 'Delhi Capitals',
      time: '5h',
      content: 'CSK’s middle order is looking dangerous. Fielding will decide this one. Bring on the spin!'
    },
    {
      id: 4,
      author: 'Sara Khan',
      team: 'Chennai Super Kings',
      time: '6h',
      content: 'Can we talk about that direct hit? Absolute rocket arm! Game-changing moment for sure.'
    },
    {
      id: 5,
      author: 'Vikram Patel',
      team: 'Rajasthan Royals',
      time: '8h',
      content: 'RR’s bowling unit is so underrated. Yorkers on point and cutters sticking nicely on this surface.'
    },
    {
      id: 6,
      author: 'Priya Nair',
      team: 'Sunrisers Hyderabad',
      time: '9h',
      content: 'Sunrisers youngsters stepping up big time. Loving the energy in the field and smart batting.'
    },
    {
      id: 7,
      author: 'Kabir Sharma',
      team: 'Kolkata Knight Riders',
      time: '11h',
      content: 'KKR need a solid start up top. If the openers click, we’re in for a 200+ total.'
    },
    {
      id: 8,
      author: 'Isha Malhotra',
      team: 'Royal Challengers Bangalore',
      time: '12h',
      content: 'RCB bowling plans look improved. Hoping for disciplined lengths in the middle overs.'
    },
    {
      id: 9,
      author: 'Arjun Mehta',
      team: 'Gujarat Titans',
      time: 'Yesterday',
      content: 'Titans showing great character in tight games. Finishing skills are elite this season.'
    },
    {
      id: 10,
      author: 'Ananya Gupta',
      team: 'Lucknow Super Giants',
      time: 'Yesterday',
      content: 'Pace off the ball is working wonders at the death. Smart captaincy to back the plan.'
    }
  ];

  const handleStartMatch = () => {
    setShowStartForm(true);
  };

  const handleStartMatchFormSubmit = (matchData) => {
    console.log('Starting match with data:', matchData);
    setCurrentMatch(matchData);
    setShowStartForm(false);
  };

  const handleEndMatch = () => {
    setCurrentMatch(null);
    // Could save match data here
  };

  // If there's a current match, show the scorer app
  if (currentMatch) {
    return (
      <ScorerApp 
        matchData={currentMatch} 
        onEndMatch={handleEndMatch} 
      />
    );
  }

  return (
    <div className="home">
      <div className="container">
        {/* Matches Scroller */}
        <section className="matches-scroller">
          <h2 className="section-title">Matches</h2>
          <div className="matches-track">
            {topMatches.map(match => (
              <div key={match.id} className={`match-card h-scroll ${match.isLive ? 'live' : ''} ${match.category === 'upcoming' ? 'upcoming' : ''}`}>
                {match.isLive && <div className="live-indicator">LIVE</div>}
                <div className="match-teams">
                  <div className="team">
                    <span className="team-name">{match.team1}</span>
                    {match.score1 && <span className="team-score">{match.score1} {match.overs1 && (<span>({match.overs1})</span>)}</span>}
                  </div>
                  <div className="vs">vs</div>
                  <div className="team">
                    <span className="team-name">{match.team2}</span>
                    {match.score2 && <span className="team-score">{match.score2} {match.overs2 && (<span>({match.overs2})</span>)}</span>}
                  </div>
                </div>
                <div className="match-status">{match.status}</div>
              </div>
            ))}
          </div>
        </section>

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

        {/* News Feed */}
        <section className="feed-section">
          <h2 className="section-title">News Feed</h2>
          <div className="feed">
            {posts.map(post => (
              <article key={post.id} className="post-card">
                <div className="post-header">
                  <div className="avatar">{post.author.split(' ').map(n => n[0]).join('')}</div>
                  <div className="post-meta">
                    <div className="post-author">{post.author} <span className="post-team">• {post.team}</span></div>
                    <div className="post-time">{post.time}</div>
                  </div>
                </div>
                <div className="post-content">{post.content}</div>
                <div className="post-actions">
                  <button className="action-btn">👍 Like</button>
                  <button className="action-btn">💬 Comment</button>
                  <button className="action-btn">↗ Share</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Start Match Button */}
      <button className="floating-btn" onClick={handleStartMatch}>
        <span className="floating-btn-icon">⚡</span>
        <span className="floating-btn-text">Start Match</span>
      </button>

      {/* Start Match Form Modal */}
      {showStartForm && (
        <StartMatchForm
          onClose={() => setShowStartForm(false)}
          onStartMatch={handleStartMatchFormSubmit}
        />
      )}
    </div>
  );
}

export default Home; 