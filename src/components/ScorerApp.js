import React, { useState, useEffect } from 'react';
import './ScorerApp.css';

function ScorerApp({ matchData, onEndMatch }) {
  const [matchState, setMatchState] = useState({
    innings: 1,
    currentBatsman1: { name: '', runs: 0, balls: 0, fours: 0, sixes: 0, isOnStrike: true },
    currentBatsman2: { name: '', runs: 0, balls: 0, fours: 0, sixes: 0, isOnStrike: false },
    currentBowler: { name: '', overs: 0, maidens: 0, runs: 0, wickets: 0 },
    totalScore: 0,
    wickets: 0,
    oversBowled: 0,
    ballsInCurrentOver: 0,
    currentOver: [],
    allOvers: [],
    firstInningsScore: 0,
    target: 0,
    battingTeam: matchData.playingFirst,
    bowlingTeam: matchData.playingFirst === matchData.teamName ? matchData.opponentName : matchData.teamName,
    matchComplete: false,
    result: '',
    showInningsBreak: false
  });

  const [activeView, setActiveView] = useState('scorer');
  const [showPlayerModal, setShowPlayerModal] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [showWicketTypes, setShowWicketTypes] = useState(false);

  const maxOvers = matchData.overs;
  const ballsPerOver = 6;
  const maxBalls = maxOvers * ballsPerOver;
  const currentBalls = (matchState.oversBowled * ballsPerOver) + matchState.ballsInCurrentOver;
  const remainingBalls = maxBalls - currentBalls;

  const wicketTypes = [
    { id: 'bowled', label: 'Bowled', icon: '🎯' },
    { id: 'caught', label: 'Caught', icon: '🤲' },
    { id: 'lbw', label: 'LBW', icon: '🦵' },
    { id: 'runout', label: 'Run Out', icon: '🏃' },
    { id: 'stumped', label: 'Stumped', icon: '🥅' },
    { id: 'hitwicket', label: 'Hit Wicket', icon: '💥' }
  ];

  // Check if innings should end
  const shouldEndInnings = () => {
    return matchState.wickets >= 10 || currentBalls >= maxBalls;
  };

  // Check if match should end (second innings)
  const shouldEndMatch = () => {
    if (matchState.innings === 2) {
      return matchState.totalScore > matchState.target || 
             matchState.wickets >= 10 || 
             currentBalls >= maxBalls;
    }
    return false;
  };

  // End current innings
  const endInnings = () => {
    if (matchState.innings === 1) {
      // First innings ending
      setMatchState(prev => ({
        ...prev,
        firstInningsScore: prev.totalScore,
        target: prev.totalScore + 1,
        showInningsBreak: true
      }));
    } else {
      // Second innings ending - match complete
      endMatch();
    }
  };

  // Start second innings
  const startSecondInnings = () => {
    setMatchState(prev => ({
      ...prev,
      innings: 2,
      currentBatsman1: { name: '', runs: 0, balls: 0, fours: 0, sixes: 0, isOnStrike: true },
      currentBatsman2: { name: '', runs: 0, balls: 0, fours: 0, sixes: 0, isOnStrike: false },
      currentBowler: { name: '', overs: 0, maidens: 0, runs: 0, wickets: 0 },
      totalScore: 0,
      wickets: 0,
      oversBowled: 0,
      ballsInCurrentOver: 0,
      currentOver: [],
      allOvers: [],
      battingTeam: prev.bowlingTeam,
      bowlingTeam: prev.battingTeam,
      showInningsBreak: false
    }));
  };

  // End match and show result
  const endMatch = () => {
    let result = '';
    if (matchState.innings === 2) {
      if (matchState.totalScore > matchState.target) {
        const wicketsRemaining = 10 - matchState.wickets;
        result = `${matchState.battingTeam} won by ${wicketsRemaining} wicket${wicketsRemaining > 1 ? 's' : ''}`;
      } else if (matchState.totalScore === matchState.target - 1) {
        result = 'Match Tied';
      } else {
        const runsRemaining = matchState.target - matchState.totalScore;
        result = `${matchState.bowlingTeam} won by ${runsRemaining} run${runsRemaining > 1 ? 's' : ''}`;
      }
    } else {
      // First innings completed with no second innings
      result = `${matchState.battingTeam} scored ${matchState.totalScore}/${matchState.wickets}`;
    }

    setMatchState(prev => ({
      ...prev,
      matchComplete: true,
      result
    }));
  };

  const addRuns = (runs) => {
    setMatchState(prev => {
      const newState = { ...prev };
      
      // Add runs to striker
      if (newState.currentBatsman1.isOnStrike) {
        newState.currentBatsman1.runs += runs;
        newState.currentBatsman1.balls += 1;
        if (runs === 4) newState.currentBatsman1.fours += 1;
        if (runs === 6) newState.currentBatsman1.sixes += 1;
      } else {
        newState.currentBatsman2.runs += runs;
        newState.currentBatsman2.balls += 1;
        if (runs === 4) newState.currentBatsman2.fours += 1;
        if (runs === 6) newState.currentBatsman2.sixes += 1;
      }

      // Add to total score
      newState.totalScore += runs;
      
      // Add to bowler's runs
      newState.currentBowler.runs += runs;

      // Add to current over
      newState.currentOver.push({ type: 'run', value: runs });

      // Change strike for odd runs
      if (runs % 2 === 1) {
        newState.currentBatsman1.isOnStrike = !newState.currentBatsman1.isOnStrike;
        newState.currentBatsman2.isOnStrike = !newState.currentBatsman2.isOnStrike;
      }

      // Progress ball
      newState.ballsInCurrentOver += 1;

      // Check if over is complete
      if (newState.ballsInCurrentOver === ballsPerOver) {
        newState.oversBowled += 1;
        newState.ballsInCurrentOver = 0;
        newState.allOvers.push([...newState.currentOver]);
        newState.currentOver = [];
        
        // Calculate bowler overs
        newState.currentBowler.overs = Math.floor(newState.oversBowled) + 
          (newState.ballsInCurrentOver / ballsPerOver);

        // Change strike at end of over
        newState.currentBatsman1.isOnStrike = !newState.currentBatsman1.isOnStrike;
        newState.currentBatsman2.isOnStrike = !newState.currentBatsman2.isOnStrike;
      }

      return newState;
    });
  };

  const addWicket = (wicketType = 'out') => {
    setMatchState(prev => {
      const newState = { ...prev };
      
      newState.wickets += 1;
      newState.currentBowler.wickets += 1;
      newState.currentOver.push({ type: 'wicket', value: 'W', wicketType });
      
      // Add ball to striker
      if (newState.currentBatsman1.isOnStrike) {
        newState.currentBatsman1.balls += 1;
      } else {
        newState.currentBatsman2.balls += 1;
      }

      // Progress ball
      newState.ballsInCurrentOver += 1;

      // Check if over is complete
      if (newState.ballsInCurrentOver === ballsPerOver) {
        newState.oversBowled += 1;
        newState.ballsInCurrentOver = 0;
        newState.allOvers.push([...newState.currentOver]);
        newState.currentOver = [];
        
        newState.currentBowler.overs = Math.floor(newState.oversBowled) + 
          (newState.ballsInCurrentOver / ballsPerOver);

        // Change strike at end of over
        newState.currentBatsman1.isOnStrike = !newState.currentBatsman1.isOnStrike;
        newState.currentBatsman2.isOnStrike = !newState.currentBatsman2.isOnStrike;
      }

      return newState;
    });
    
    setShowWicketTypes(false);
    
    // If not all out, get new batsman
    if (matchState.wickets < 9) {
      setShowPlayerModal('newBatsman');
    }
  };

  const addExtra = (type, runs = 1) => {
    setMatchState(prev => {
      const newState = { ...prev };
      
      newState.totalScore += runs;
      newState.currentBowler.runs += runs;
      newState.currentOver.push({ type: 'extra', value: type + (runs > 1 ? runs : '') });

      // Wide and No-ball don't count as balls
      if (type !== 'wd' && type !== 'nb') {
        // Add ball to striker
        if (newState.currentBatsman1.isOnStrike) {
          newState.currentBatsman1.balls += 1;
        } else {
          newState.currentBatsman2.balls += 1;
        }

        newState.ballsInCurrentOver += 1;
      }

      // Check if over is complete
      if (newState.ballsInCurrentOver === ballsPerOver) {
        newState.oversBowled += 1;
        newState.ballsInCurrentOver = 0;
        newState.allOvers.push([...newState.currentOver]);
        newState.currentOver = [];
        
        newState.currentBowler.overs = Math.floor(newState.oversBowled) + 
          (newState.ballsInCurrentOver / ballsPerOver);

        // Change strike at end of over
        newState.currentBatsman1.isOnStrike = !newState.currentBatsman1.isOnStrike;
        newState.currentBatsman2.isOnStrike = !newState.currentBatsman2.isOnStrike;
      }

      return newState;
    });
  };

  const updatePlayer = (playerType, name) => {
    setMatchState(prev => {
      const newState = { ...prev };
      
      if (playerType === 'batsman1') {
        newState.currentBatsman1.name = name;
      } else if (playerType === 'batsman2') {
        newState.currentBatsman2.name = name;
      } else if (playerType === 'bowler') {
        newState.currentBowler.name = name;
      } else if (playerType === 'newBatsman') {
        // Replace the dismissed batsman
        if (newState.currentBatsman1.isOnStrike) {
          newState.currentBatsman1 = { 
            name, runs: 0, balls: 0, fours: 0, sixes: 0, isOnStrike: true 
          };
        } else {
          newState.currentBatsman2 = { 
            name, runs: 0, balls: 0, fours: 0, sixes: 0, isOnStrike: false 
          };
        }
      }
      
      return newState;
    });
    
    setShowPlayerModal(null);
    setPlayerName('');
  };

  const undoLastBall = () => {
    if (matchState.currentOver.length === 0 && matchState.allOvers.length === 0) return;
    
    setMatchState(prev => {
      const newState = { ...prev };
      let lastBall;
      
      if (newState.currentOver.length > 0) {
        lastBall = newState.currentOver.pop();
        newState.ballsInCurrentOver -= 1;
      } else if (newState.allOvers.length > 0) {
        const lastOver = newState.allOvers.pop();
        lastBall = lastOver.pop();
        newState.allOvers.push(lastOver);
        newState.currentOver = lastOver;
        newState.oversBowled -= 1;
        newState.ballsInCurrentOver = ballsPerOver - 1;
      }
      
      if (lastBall) {
        if (lastBall.type === 'run') {
          newState.totalScore -= lastBall.value;
          newState.currentBowler.runs -= lastBall.value;
          
          // Undo runs for batsman
          if (newState.currentBatsman1.isOnStrike) {
            newState.currentBatsman1.runs -= lastBall.value;
            newState.currentBatsman1.balls -= 1;
            if (lastBall.value === 4) newState.currentBatsman1.fours -= 1;
            if (lastBall.value === 6) newState.currentBatsman1.sixes -= 1;
          } else {
            newState.currentBatsman2.runs -= lastBall.value;
            newState.currentBatsman2.balls -= 1;
            if (lastBall.value === 4) newState.currentBatsman2.fours -= 1;
            if (lastBall.value === 6) newState.currentBatsman2.sixes -= 1;
          }
        } else if (lastBall.type === 'wicket') {
          newState.wickets -= 1;
          newState.currentBowler.wickets -= 1;
        }
      }
      
      return newState;
    });
  };

  // Check for innings/match end after each ball
  useEffect(() => {
    if (shouldEndMatch()) {
      endMatch();
    } else if (shouldEndInnings() && matchState.innings === 1) {
      endInnings();
    }
  }, [matchState.wickets, currentBalls, matchState.totalScore]);

  const getStrikeRate = (runs, balls) => {
    return balls > 0 ? ((runs / balls) * 100).toFixed(1) : '0.0';
  };

  const getRunRate = () => {
    const totalBalls = (matchState.oversBowled * ballsPerOver) + matchState.ballsInCurrentOver;
    const totalOvers = totalBalls / ballsPerOver;
    return totalOvers > 0 ? (matchState.totalScore / totalOvers).toFixed(2) : '0.00';
  };

  const getRequiredRunRate = () => {
    if (matchState.target === 0 || matchState.innings === 1) return '0.00';
    const remainingRuns = matchState.target - matchState.totalScore;
    const remainingOvers = remainingBalls / ballsPerOver;
    return remainingOvers > 0 ? (remainingRuns / remainingOvers).toFixed(2) : '0.00';
  };

  // Innings Break Modal
  const renderInningsBreak = () => (
    matchState.showInningsBreak && (
      <div className="innings-break-overlay">
        <div className="innings-break-modal">
          <h2>End of First Innings</h2>
          <div className="innings-summary">
            <h3>{matchState.battingTeam}</h3>
            <div className="final-score">{matchState.firstInningsScore}/{matchState.wickets}</div>
            <div className="overs-info">({matchState.oversBowled}.{matchState.ballsInCurrentOver} overs)</div>
          </div>
          <div className="target-info">
            <p><strong>{matchState.bowlingTeam}</strong> need <strong>{matchState.target}</strong> runs to win</p>
          </div>
          <button className="btn btn-primary" onClick={startSecondInnings}>
            Start Second Innings
          </button>
        </div>
      </div>
    )
  );

  // Match Complete Modal
  const renderMatchComplete = () => (
    matchState.matchComplete && (
      <div className="match-complete-overlay">
        <div className="match-complete-modal">
          <h2>🏆 Match Complete!</h2>
          <div className="match-result">
            <h3>{matchState.result}</h3>
          </div>
          <div className="final-scores">
            <div className="team-score">
              <h4>{matchData.playingFirst}</h4>
              <p>{matchState.innings === 1 ? matchState.totalScore : matchState.firstInningsScore}/{matchState.innings === 1 ? matchState.wickets : 10}</p>
            </div>
            <div className="team-score">
              <h4>{matchData.playingFirst === matchData.teamName ? matchData.opponentName : matchData.teamName}</h4>
              <p>{matchState.innings === 2 ? matchState.totalScore : 0}/{matchState.innings === 2 ? matchState.wickets : 0}</p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={onEndMatch}>
            Back to Home
          </button>
        </div>
      </div>
    )
  );

  const renderScorer = () => (
    <div className="scorer-interface">
      {/* Score Display */}
      <div className="score-display">
        <div className="main-score">
          <h2>{matchState.battingTeam} - Innings {matchState.innings}</h2>
          <div className="score-line">
            <span className="total-score">{matchState.totalScore}/{matchState.wickets}</span>
            <span className="overs">({matchState.oversBowled}.{matchState.ballsInCurrentOver})</span>
          </div>
          <div className="run-rate">Run Rate: {getRunRate()}</div>
          {matchState.target > 0 && matchState.innings === 2 && (
            <div className="target-info">
              Target: {matchState.target} | Need: {Math.max(0, matchState.target - matchState.totalScore)} 
              | RRR: {getRequiredRunRate()}
            </div>
          )}
        </div>
      </div>

      {/* Current Players */}
      <div className="current-players">
        <div className={`batsman-card ${matchState.currentBatsman1.isOnStrike ? 'on-strike' : ''}`}>
          <div className="player-header">
            <span className="player-name">
              {matchState.currentBatsman1.name || (
                <button 
                  className="add-player-btn"
                  onClick={() => setShowPlayerModal('batsman1')}
                >
                  + Add Batsman
                </button>
              )}
            </span>
            {matchState.currentBatsman1.isOnStrike && <span className="strike-indicator">*</span>}
          </div>
          <div className="player-stats">
            <span>{matchState.currentBatsman1.runs}({matchState.currentBatsman1.balls})</span>
            <span>SR: {getStrikeRate(matchState.currentBatsman1.runs, matchState.currentBatsman1.balls)}</span>
          </div>
          <div className="boundaries">
            <span>4s: {matchState.currentBatsman1.fours}</span>
            <span>6s: {matchState.currentBatsman1.sixes}</span>
          </div>
        </div>

        <div className={`batsman-card ${matchState.currentBatsman2.isOnStrike ? 'on-strike' : ''}`}>
          <div className="player-header">
            <span className="player-name">
              {matchState.currentBatsman2.name || (
                <button 
                  className="add-player-btn"
                  onClick={() => setShowPlayerModal('batsman2')}
                >
                  + Add Batsman
                </button>
              )}
            </span>
            {matchState.currentBatsman2.isOnStrike && <span className="strike-indicator">*</span>}
          </div>
          <div className="player-stats">
            <span>{matchState.currentBatsman2.runs}({matchState.currentBatsman2.balls})</span>
            <span>SR: {getStrikeRate(matchState.currentBatsman2.runs, matchState.currentBatsman2.balls)}</span>
          </div>
          <div className="boundaries">
            <span>4s: {matchState.currentBatsman2.fours}</span>
            <span>6s: {matchState.currentBatsman2.sixes}</span>
          </div>
        </div>

        <div className="bowler-card">
          <div className="player-header">
            <span className="player-name">
              {matchState.currentBowler.name || (
                <button 
                  className="add-player-btn"
                  onClick={() => setShowPlayerModal('bowler')}
                >
                  + Add Bowler
                </button>
              )}
            </span>
          </div>
          <div className="player-stats">
            <span>{matchState.currentBowler.wickets}/{matchState.currentBowler.runs}</span>
            <span>({matchState.currentBowler.overs} ov)</span>
          </div>
        </div>
      </div>

      {/* Current Over */}
      <div className="current-over">
        <h4>This Over</h4>
        <div className="over-balls">
          {matchState.currentOver.map((ball, index) => (
            <span key={index} className={`ball ${ball.type}`}>
              {ball.value}
            </span>
          ))}
          {Array.from({ length: ballsPerOver - matchState.currentOver.length }).map((_, index) => (
            <span key={`empty-${index}`} className="ball empty">•</span>
          ))}
        </div>
      </div>

      {/* Scoring Buttons */}
      <div className="scoring-buttons">
        <div className="runs-section">
          <h4>Runs</h4>
          <div className="button-grid">
            {[0, 1, 2, 3, 4, 6].map(runs => (
              <button 
                key={runs} 
                className={`score-btn ${runs === 4 || runs === 6 ? 'boundary' : ''}`}
                onClick={() => addRuns(runs)}
              >
                {runs}
              </button>
            ))}
          </div>
        </div>

        <div className="extras-section">
          <h4>Extras</h4>
          <div className="button-grid">
            <button className="score-btn extra" onClick={() => addExtra('wd')}>Wide</button>
            <button className="score-btn extra" onClick={() => addExtra('nb')}>No Ball</button>
            <button className="score-btn extra" onClick={() => addExtra('b')}>Bye</button>
            <button className="score-btn extra" onClick={() => addExtra('lb')}>Leg Bye</button>
          </div>
        </div>

        <div className="wicket-section">
          <button className="wicket-btn" onClick={() => setShowWicketTypes(true)}>
            🎯 WICKET
          </button>
          
          {/* Wicket Types Modal */}
          {showWicketTypes && (
            <div className="wicket-types-overlay">
              <div className="wicket-types-modal">
                <h3>Select Wicket Type</h3>
                <div className="wicket-types-grid">
                  {wicketTypes.map(wicket => (
                    <button
                      key={wicket.id}
                      className="wicket-type-btn"
                      onClick={() => addWicket(wicket.id)}
                    >
                      <span className="wicket-icon">{wicket.icon}</span>
                      <span className="wicket-label">{wicket.label}</span>
                    </button>
                  ))}
                </div>
                <button className="btn btn-secondary" onClick={() => setShowWicketTypes(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="action-btn undo" onClick={undoLastBall}>
          ↶ Undo
        </button>
        <button className="action-btn end-innings" onClick={endInnings}>
          End Innings
        </button>
      </div>
    </div>
  );

  const renderPlayerModal = () => (
    showPlayerModal && (
      <div className="player-modal-overlay">
        <div className="player-modal">
          <h3>
            {showPlayerModal === 'batsman1' && 'Add Batsman 1'}
            {showPlayerModal === 'batsman2' && 'Add Batsman 2'}
            {showPlayerModal === 'bowler' && 'Add Bowler'}
            {showPlayerModal === 'newBatsman' && 'New Batsman'}
          </h3>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter player name"
            className="player-input"
            autoFocus
          />
          <div className="modal-actions">
            <button 
              className="btn btn-primary"
              onClick={() => updatePlayer(showPlayerModal, playerName)}
              disabled={!playerName.trim()}
            >
              Add Player
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setShowPlayerModal(null);
                setPlayerName('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="scorer-app">
      <div className="scorer-header">
        <div className="match-info">
          <h2>{matchData.teamName} vs {matchData.opponentName}</h2>
          <p>{matchData.location} • {matchData.overs} Over{matchData.overs > 1 ? 's' : ''}</p>
        </div>
        <button className="end-match-btn" onClick={onEndMatch}>
          End Match
        </button>
      </div>

      <div className="scorer-tabs">
        <button 
          className={`tab-btn ${activeView === 'scorer' ? 'active' : ''}`}
          onClick={() => setActiveView('scorer')}
        >
          📊 Scorer
        </button>
        <button 
          className={`tab-btn ${activeView === 'scorecard' ? 'active' : ''}`}
          onClick={() => setActiveView('scorecard')}
        >
          📋 Scorecard
        </button>
      </div>

      <div className="scorer-content">
        {activeView === 'scorer' && renderScorer()}
        {activeView === 'scorecard' && (
          <div className="scorecard-view">
            <h3>Match Scorecard</h3>
            <p>Detailed scorecard view coming soon...</p>
          </div>
        )}
      </div>

      {renderPlayerModal()}
      {renderInningsBreak()}
      {renderMatchComplete()}
    </div>
  );
}

export default ScorerApp; 