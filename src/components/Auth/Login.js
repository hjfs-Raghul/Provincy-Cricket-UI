import React, { useState } from 'react';
import './Auth.css';

function Login({ onLogin, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    mobile: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};
    
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - check against mock users
      const mockUsers = JSON.parse(localStorage.getItem('cricketUsers') || '[]');
      const user = mockUsers.find(u => u.mobile === formData.mobile && u.password === formData.password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        onLogin(user);
      } else {
        setErrors({ general: 'Invalid mobile number or password' });
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon">🏏</span>
            <h1>Provincial Cricket</h1>
          </div>
          <h2>Welcome Back!</h2>
          <p>Sign in to continue your cricket journey</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              placeholder="Enter your mobile number"
              className={`form-input ${errors.mobile ? 'error' : ''}`}
              maxLength="10"
            />
            {errors.mobile && <span className="error-message">{errors.mobile}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter your password"
              className={`form-input ${errors.password ? 'error' : ''}`}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="auth-button primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">🔄</span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <button className="link-button" onClick={onSwitchToRegister}>
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login; 