import React, { useState } from 'react';
import './Notifications.css';

function Notifications({ embedded = false }) {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'match',
      title: 'Match Starting Soon!',
      message: 'Mumbai Indians vs Chennai Super Kings starts in 30 minutes',
      time: '5 min ago',
      read: false,
      icon: '⚡'
    },
    {
      id: 2,
      type: 'result',
      title: 'Match Result',
      message: 'Delhi Capitals won by 6 wickets against Punjab Kings',
      time: '1 hour ago',
      read: false,
      icon: '🏆'
    },
    {
      id: 3,
      type: 'team',
      title: 'Team Update',
      message: 'Your favorite team Chennai Super Kings has a new captain!',
      time: '3 hours ago',
      read: true,
      icon: '👤'
    },
    {
      id: 4,
      type: 'league',
      title: 'League Announcement',
      message: 'New tournament rules have been updated. Check them out!',
      time: '1 day ago',
      read: true,
      icon: '📢'
    },
    {
      id: 5,
      type: 'score',
      title: 'Live Score Update',
      message: 'Royal Challengers need 45 runs in 4 overs',
      time: '2 days ago',
      read: true,
      icon: '🎯'
    },
    {
      id: 6,
      type: 'match',
      title: 'Rain Delay',
      message: 'Match delayed due to rain. New start time: 8:30 PM',
      time: '3 days ago',
      read: true,
      icon: '🌧️'
    }
  ];

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'match', label: 'Matches', count: notifications.filter(n => n.type === 'match').length },
    { id: 'team', label: 'Teams', count: notifications.filter(n => n.type === 'team').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id) => {
    // Mark notification as read
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    console.log('Marking all notifications as read');
  };

  return (
    <div className={`notifications ${embedded ? 'embedded' : ''}`}>
      <div className="container">
        {!embedded && (
          <div className="notifications-header">
            <h1 className="page-title">Notifications</h1>
            {notifications.some(n => !n.read) && (
              <button className="mark-all-read" onClick={markAllAsRead}>
                Mark All Read
              </button>
            )}
          </div>
        )}

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {filters.map(filterItem => (
            <button
              key={filterItem.id}
              className={`filter-tab ${filter === filterItem.id ? 'active' : ''}`}
              onClick={() => setFilter(filterItem.id)}
            >
              <span className="filter-label">{filterItem.label}</span>
              {filterItem.count > 0 && (
                <span className="filter-count">{filterItem.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notification-icon">
                  <span>{notification.icon}</span>
                </div>
                <div className="notification-content">
                  <h3 className="notification-title">{notification.title}</h3>
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
                {!notification.read && <div className="unread-dot"></div>}
              </div>
            ))
          ) : (
            <div className="no-notifications">
              <span className="no-notifications-icon">🔔</span>
              <h3>No notifications</h3>
              <p>You're all caught up! No {filter !== 'all' ? filter : ''} notifications to show.</p>
            </div>
          )}
        </div>

        {/* Notification Settings */}
        {!embedded && (
          <div className="notification-settings">
            <h3>Notification Settings</h3>
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-icon">⚡</span>
                  <div>
                    <h4>Match Updates</h4>
                    <p>Get notified about match starts and results</p>
                  </div>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-icon">🏆</span>
                  <div>
                    <h4>Team News</h4>
                    <p>Updates about your favorite teams</p>
                  </div>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-icon">🎯</span>
                  <div>
                    <h4>Live Scores</h4>
                    <p>Real-time score updates during matches</p>
                  </div>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications; 