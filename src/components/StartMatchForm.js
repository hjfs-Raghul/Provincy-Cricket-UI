import React, { useState } from 'react';
import './StartMatchForm.css';

function StartMatchForm({ onClose, onStartMatch }) {
  const [formData, setFormData] = useState({
    teamName: '',
    opponentName: '',
    overs: 1,
    location: '',
    matchType: 'local',
    tossWinner: '',
    tossDecision: 'bat',
    playingFirst: '',
    umpire: '',
    weatherConditions: 'clear'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const matchTypes = [
    { value: 'local', label: 'Local Match', icon: '🏟️' },
    { value: 'friendly', label: 'Friendly', icon: '🤝' },
    { value: 'tournament', label: 'Tournament', icon: '🏆' },
    { value: 'practice', label: 'Practice', icon: '🏃' }
  ];

  const weatherOptions = [
    { value: 'clear', label: 'Clear', icon: '☀️' },
    { value: 'cloudy', label: 'Cloudy', icon: '☁️' },
    { value: 'overcast', label: 'Overcast', icon: '🌫️' },
    { value: 'light-rain', label: 'Light Rain', icon: '🌦️' }
  ];

  const overs = [1, 2, 3, 5, 10, 15, 20, 50];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTossWinner = (team) => {
    setFormData(prev => ({
      ...prev,
      tossWinner: team,
      playingFirst: prev.tossDecision === 'bat' ? team : (team === prev.teamName ? prev.opponentName : prev.teamName)
    }));
  };

  const handleTossDecision = (decision) => {
    setFormData(prev => ({
      ...prev,
      tossDecision: decision,
      playingFirst: decision === 'bat' ? prev.tossWinner : (prev.tossWinner === prev.teamName ? prev.opponentName : prev.teamName)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedStep1 = formData.teamName && formData.opponentName && formData.location;
  const canProceedStep2 = formData.tossWinner && formData.playingFirst;
  const canStartMatch = canProceedStep1 && canProceedStep2;

  const handleStartMatch = () => {
    if (canStartMatch) {
      onStartMatch(formData);
    }
  };

  const renderStep1 = () => (
    <div className="form-step">
      <h3>Match Details</h3>
      
      <div className="form-group">
        <label>Your Team Name *</label>
        <input
          type="text"
          value={formData.teamName}
          onChange={(e) => handleInputChange('teamName', e.target.value)}
          placeholder="Enter your team name"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Opponent Team Name *</label>
        <input
          type="text"
          value={formData.opponentName}
          onChange={(e) => handleInputChange('opponentName', e.target.value)}
          placeholder="Enter opponent team name"
          className="form-input"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Number of Overs</label>
          <select
            value={formData.overs}
            onChange={(e) => handleInputChange('overs', parseInt(e.target.value))}
            className="form-select"
          >
            {overs.map(over => (
              <option key={over} value={over}>{over} Over{over > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Match Type</label>
          <select
            value={formData.matchType}
            onChange={(e) => handleInputChange('matchType', e.target.value)}
            className="form-select"
          >
            {matchTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.icon} {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Location/Ground *</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder="Enter ground or location"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Umpire/Scorer Name</label>
        <input
          type="text"
          value={formData.umpire}
          onChange={(e) => handleInputChange('umpire', e.target.value)}
          placeholder="Enter umpire name (optional)"
          className="form-input"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h3>Toss & Weather</h3>
      
      <div className="form-group">
        <label>Toss Winner *</label>
        <div className="button-group">
          <button
            type="button"
            className={`option-btn ${formData.tossWinner === formData.teamName ? 'selected' : ''}`}
            onClick={() => handleTossWinner(formData.teamName)}
          >
            {formData.teamName || 'Your Team'}
          </button>
          <button
            type="button"
            className={`option-btn ${formData.tossWinner === formData.opponentName ? 'selected' : ''}`}
            onClick={() => handleTossWinner(formData.opponentName)}
          >
            {formData.opponentName || 'Opponent'}
          </button>
        </div>
      </div>

      {formData.tossWinner && (
        <div className="form-group">
          <label>Toss Decision</label>
          <div className="button-group">
            <button
              type="button"
              className={`option-btn ${formData.tossDecision === 'bat' ? 'selected' : ''}`}
              onClick={() => handleTossDecision('bat')}
            >
              🏏 Bat First
            </button>
            <button
              type="button"
              className={`option-btn ${formData.tossDecision === 'bowl' ? 'selected' : ''}`}
              onClick={() => handleTossDecision('bowl')}
            >
              ⚾ Bowl First
            </button>
          </div>
        </div>
      )}

      {formData.playingFirst && (
        <div className="playing-first-info">
          <p><strong>{formData.playingFirst}</strong> will bat first</p>
        </div>
      )}

      <div className="form-group">
        <label>Weather Conditions</label>
        <div className="weather-grid">
          {weatherOptions.map(weather => (
            <button
              key={weather.value}
              type="button"
              className={`weather-btn ${formData.weatherConditions === weather.value ? 'selected' : ''}`}
              onClick={() => handleInputChange('weatherConditions', weather.value)}
            >
              <span className="weather-icon">{weather.icon}</span>
              <span className="weather-label">{weather.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h3>Match Summary</h3>
      
      <div className="match-summary">
        <div className="summary-card">
          <div className="summary-header">
            <h4>📋 Match Details</h4>
          </div>
          <div className="summary-content">
            <div className="summary-row">
              <span>Teams:</span>
              <span><strong>{formData.teamName}</strong> vs <strong>{formData.opponentName}</strong></span>
            </div>
            <div className="summary-row">
              <span>Overs:</span>
              <span>{formData.overs} over{formData.overs > 1 ? 's' : ''}</span>
            </div>
            <div className="summary-row">
              <span>Location:</span>
              <span>{formData.location}</span>
            </div>
            <div className="summary-row">
              <span>Type:</span>
              <span>{matchTypes.find(t => t.value === formData.matchType)?.label}</span>
            </div>
            {formData.umpire && (
              <div className="summary-row">
                <span>Umpire:</span>
                <span>{formData.umpire}</span>
              </div>
            )}
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-header">
            <h4>🪙 Toss Result</h4>
          </div>
          <div className="summary-content">
            <div className="summary-row">
              <span>Toss Winner:</span>
              <span><strong>{formData.tossWinner}</strong></span>
            </div>
            <div className="summary-row">
              <span>Decision:</span>
              <span>{formData.tossDecision === 'bat' ? 'Bat First' : 'Bowl First'}</span>
            </div>
            <div className="summary-row">
              <span>Batting First:</span>
              <span><strong>{formData.playingFirst}</strong></span>
            </div>
            <div className="summary-row">
              <span>Weather:</span>
              <span>
                {weatherOptions.find(w => w.value === formData.weatherConditions)?.icon} {' '}
                {weatherOptions.find(w => w.value === formData.weatherConditions)?.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="start-match-overlay">
      <div className="start-match-form">
        <div className="form-header">
          <h2>Start New Match</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          {[1, 2, 3].map(step => (
            <div key={step} className={`progress-step ${currentStep >= step ? 'active' : ''}`}>
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 ? 'Details' : step === 2 ? 'Toss' : 'Summary'}
              </div>
            </div>
          ))}
        </div>

        <div className="form-content">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        <div className="form-actions">
          {currentStep > 1 && (
            <button className="btn btn-secondary" onClick={prevStep}>
              ← Previous
            </button>
          )}
          
          <div className="spacer"></div>
          
          {currentStep < totalSteps ? (
            <button 
              className="btn btn-primary" 
              onClick={nextStep}
              disabled={
                (currentStep === 1 && !canProceedStep1) ||
                (currentStep === 2 && !canProceedStep2)
              }
            >
              Next →
            </button>
          ) : (
            <button 
              className="btn btn-success start-match-btn" 
              onClick={handleStartMatch}
              disabled={!canStartMatch}
            >
              🏏 Start Match
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartMatchForm; 