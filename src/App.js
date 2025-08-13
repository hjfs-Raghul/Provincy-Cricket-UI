import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Messages from './components/Messages';
import Matches from './components/Matches';
import Profile from './components/Profile/Profile';
import Notifications from './components/Notifications';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { initializeMockUsers } from './data/mockUsers';
import { initializeMockTeams } from './data/mockTeams';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'
  const [isLoading, setIsLoading] = useState(true);

  // Initialize app and check for existing user session
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize mock users
        const users = initializeMockUsers();
        
        // Initialize mock teams with user assignments
        initializeMockTeams(users);
        
        // Check for existing user session
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setActiveTab('home');
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return <Home />;
      case 'messages':
        return <Messages />;
      case 'matches':
        return <Matches />;
      case 'profile':
        return <Profile currentUser={currentUser} onUpdateUser={handleUpdateUser} />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Home />;
    }
  };

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-content">
          <span className="loading-icon">🏏</span>
          <h2>Provincial Cricket</h2>
          <p>Loading your cricket experience...</p>
        </div>
      </div>
    );
  }

  // Show authentication if user is not logged in
  if (!currentUser) {
    return (
      <div className="app">
        {authView === 'login' ? (
          <Login 
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthView('register')}
          />
        ) : (
          <Register 
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthView('login')}
          />
        )}
      </div>
    );
  }

  // Show main app for logged in users
  return (
    <div className="app">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <main className="main-content">
        {renderContent()}
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App; 