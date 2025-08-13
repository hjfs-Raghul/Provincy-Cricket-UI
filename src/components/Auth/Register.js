import React, { useState } from 'react';
import './Auth.css';

function Register({ onRegister, onSwitchToLogin }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState({
    // Step 1: Basic Details
    name: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Cricket Profile
    playerType: '',
    battingStyle: '',
    bowlingStyle: '',
    preferredPosition: '',
    
    // Step 3: Additional Info
    dateOfBirth: '',
    city: '',
    experience: '',
    favoriteTeam: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const playerTypes = [
    { value: 'batsman', label: 'Batsman', icon: '🏏' },
    { value: 'bowler', label: 'Bowler', icon: '⚾' },
    { value: 'allrounder', label: 'All-rounder', icon: '🎯' },
    { value: 'wicketkeeper', label: 'Wicket Keeper', icon: '🥅' }
  ];

  const battingStyles = [
    { value: 'right', label: 'Right Handed', icon: '👉' },
    { value: 'left', label: 'Left Handed', icon: '👈' }
  ];

  const bowlingStyles = [
    { value: 'right-fast', label: 'Right Arm Fast', icon: '💨' },
    { value: 'left-fast', label: 'Left Arm Fast', icon: '💨' },
    { value: 'right-spin', label: 'Right Arm Spin', icon: '🌀' },
    { value: 'left-spin', label: 'Left Arm Spin', icon: '🌀' },
    { value: 'none', label: 'Non-bowler', icon: '🚫' }
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner (0-2 years)' },
    { value: 'intermediate', label: 'Intermediate (2-5 years)' },
    { value: 'experienced', label: 'Experienced (5-10 years)' },
    { value: 'professional', label: 'Professional (10+ years)' }
  ];

  const teams = [
    'Mumbai Indians', 'Chennai Super Kings', 'Royal Challengers Bangalore',
    'Delhi Capitals', 'Kolkata Knight Riders', 'Punjab Kings',
    'Rajasthan Royals', 'Sunrisers Hyderabad', 'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
      
      if (!formData.mobile.trim()) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
      
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (step === 2) {
      if (!formData.playerType) {
        newErrors.playerType = 'Please select your player type';
      }
      
      if (!formData.battingStyle) {
        newErrors.battingStyle = 'Please select your batting style';
      }
      
      if (formData.playerType === 'bowler' || formData.playerType === 'allrounder') {
        if (!formData.bowlingStyle) {
          newErrors.bowlingStyle = 'Please select your bowling style';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if mobile number already exists
      const existingUsers = JSON.parse(localStorage.getItem('cricketUsers') || '[]');
      if (existingUsers.some(user => user.mobile === formData.mobile)) {
        setErrors({ mobile: 'Mobile number already registered' });
        setCurrentStep(1);
        setIsLoading(false);
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...formData,
        registeredAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=1a5f7a&color=fff`
      };
      
      // Save to localStorage (in real app, this would be an API call)
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('cricketUsers', JSON.stringify(updatedUsers));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      onRegister(newUser);
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="step-content">
      <h3>Basic Information</h3>
      
      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter your full name"
          className={`form-input ${errors.name ? 'error' : ''}`}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="mobile">Mobile Number *</label>
        <input
          id="mobile"
          type="tel"
          value={formData.mobile}
          onChange={(e) => handleInputChange('mobile', e.target.value)}
          placeholder="Your mobile will be your username"
          className={`form-input ${errors.mobile ? 'error' : ''}`}
          maxLength="10"
        />
        {errors.mobile && <span className="error-message">{errors.mobile}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password *</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          placeholder="Minimum 6 characters"
          className={`form-input ${errors.password ? 'error' : ''}`}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password *</label>
        <input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          placeholder="Re-enter your password"
          className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
        />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="step-content">
      <h3>Cricket Profile</h3>
      
      <div className="form-group">
        <label>Player Type *</label>
        <div className="option-grid">
          {playerTypes.map(type => (
            <button
              key={type.value}
              type="button"
              className={`option-card ${formData.playerType === type.value ? 'selected' : ''}`}
              onClick={() => handleInputChange('playerType', type.value)}
            >
              <span className="option-icon">{type.icon}</span>
              <span className="option-label">{type.label}</span>
            </button>
          ))}
        </div>
        {errors.playerType && <span className="error-message">{errors.playerType}</span>}
      </div>

      <div className="form-group">
        <label>Batting Style *</label>
        <div className="option-grid">
          {battingStyles.map(style => (
            <button
              key={style.value}
              type="button"
              className={`option-card ${formData.battingStyle === style.value ? 'selected' : ''}`}
              onClick={() => handleInputChange('battingStyle', style.value)}
            >
              <span className="option-icon">{style.icon}</span>
              <span className="option-label">{style.label}</span>
            </button>
          ))}
        </div>
        {errors.battingStyle && <span className="error-message">{errors.battingStyle}</span>}
      </div>

      {(formData.playerType === 'bowler' || formData.playerType === 'allrounder') && (
        <div className="form-group">
          <label>Bowling Style *</label>
          <div className="option-grid bowling-grid">
            {bowlingStyles.map(style => (
              <button
                key={style.value}
                type="button"
                className={`option-card ${formData.bowlingStyle === style.value ? 'selected' : ''}`}
                onClick={() => handleInputChange('bowlingStyle', style.value)}
              >
                <span className="option-icon">{style.icon}</span>
                <span className="option-label">{style.label}</span>
              </button>
            ))}
          </div>
          {errors.bowlingStyle && <span className="error-message">{errors.bowlingStyle}</span>}
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="step-content">
      <h3>Additional Details</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Your city"
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="experience">Experience Level</label>
        <select
          id="experience"
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          className="form-select"
        >
          <option value="">Select experience level</option>
          {experienceLevels.map(level => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="favoriteTeam">Favorite Team</label>
        <select
          id="favoriteTeam"
          value={formData.favoriteTeam}
          onChange={(e) => handleInputChange('favoriteTeam', e.target.value)}
          className="form-select"
        >
          <option value="">Select favorite team</option>
          {teams.map(team => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="auth-container">
      <div className="auth-card register">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon">🏏</span>
            <h1>Join Provincial Cricket</h1>
          </div>
          <h2>Create Your Player Profile</h2>
          <p>Step {currentStep} of {totalSteps}</p>
        </div>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          {[1, 2, 3].map(step => (
            <div key={step} className={`progress-step ${currentStep >= step ? 'active' : ''}`}>
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 ? 'Basic' : step === 2 ? 'Cricket' : 'Details'}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          <div className="form-actions">
            {currentStep > 1 && (
              <button type="button" className="auth-button secondary" onClick={prevStep}>
                ← Previous
              </button>
            )}
            
            <div className="spacer"></div>
            
            {currentStep < totalSteps ? (
              <button type="button" className="auth-button primary" onClick={nextStep}>
                Next →
              </button>
            ) : (
              <button 
                type="submit" 
                className="auth-button success"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner">🔄</span>
                ) : (
                  '🏏 Join Cricket Community'
                )}
              </button>
            )}
          </div>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <button className="link-button" onClick={onSwitchToLogin}>
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register; 