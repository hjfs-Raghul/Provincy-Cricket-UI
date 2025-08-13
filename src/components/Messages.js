import React, { useState } from 'react';
import './Messages.css';
import Notifications from './Notifications';

function Messages() {
  const [activeChat, setActiveChat] = useState(null);
  const [activeTab, setActiveTab] = useState('messages');

  const conversations = [
    {
      id: 1,
      name: 'Team Chennai Super Kings',
      avatar: '🏏',
      lastMessage: 'Great match today! Ready for tomorrow?',
      time: '10:30 AM',
      unread: 3,
      online: true
    },
    {
      id: 2,
      name: 'Mumbai Indians Squad',
      avatar: '⚡',
      lastMessage: 'Training session at 6 PM',
      time: '9:15 AM',
      unread: 1,
      online: true
    },
    {
      id: 3,
      name: 'Match Officials',
      avatar: '👨‍⚖️',
      lastMessage: 'Rain update: Match will continue',
      time: 'Yesterday',
      unread: 0,
      online: false
    },
    {
      id: 4,
      name: 'Delhi Capitals',
      avatar: '🔥',
      lastMessage: 'Thanks for the match!',
      time: 'Yesterday',
      unread: 0,
      online: false
    },
    {
      id: 5,
      name: 'League Announcements',
      avatar: '📢',
      lastMessage: 'New tournament rules updated',
      time: '2 days ago',
      unread: 0,
      online: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Captain',
      message: 'Great batting today! Well played everyone.',
      time: '10:32 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      message: 'Thanks! That last over was intense.',
      time: '10:33 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Coach',
      message: 'Tomorrow we practice bowling. 6 AM sharp!',
      time: '10:35 AM',
      isOwn: false
    }
  ];

  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
  };

  return (
    <div className="messages">
      <div className="container">
        <h1 className="page-title">{activeTab === 'messages' ? 'Messages' : 'Notifications'}</h1>

        {/* Inner Tabs */}
        {!activeChat && (
          <div className="inner-tabs">
            <button
              className={`inner-tab ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              💬 Messages
            </button>
            <button
              className={`inner-tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              🔔 Notifications
            </button>
          </div>
        )}
        
        {activeTab === 'notifications' && !activeChat ? (
          <div className="embedded-notifications">
            <Notifications embedded />
          </div>
        ) : (
          <>
            {activeChat ? (
              /* Chat View */
              <div className="chat-view">
                <div className="chat-header">
                  <button className="back-btn" onClick={() => setActiveChat(null)}>
                    ← Back
                  </button>
                  <div className="chat-info">
                    <span className="chat-avatar">🏏</span>
                    <div>
                      <h3>Team Chennai Super Kings</h3>
                      <span className="online-status">8 members online</span>
                    </div>
                  </div>
                </div>
                
                <div className="messages-list">
                  {messages.map(msg => (
                    <div key={msg.id} className={`message ${msg.isOwn ? 'own' : ''}`}>
                      <div className="message-content">
                        {!msg.isOwn && <span className="sender-name">{msg.sender}</span>}
                        <p className="message-text">{msg.message}</p>
                        <span className="message-time">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="message-input">
                  <input type="text" placeholder="Type a message..." />
                  <button className="send-btn">Send</button>
                </div>
              </div>
            ) : (
              /* Conversations List */
              <div className="conversations-list">
                {conversations.map(conv => (
                  <div 
                    key={conv.id} 
                    className="conversation-item"
                    onClick={() => handleChatSelect(conv.id)}
                  >
                    <div className="conv-avatar">
                      <span className="avatar-icon">{conv.avatar}</span>
                      {conv.online && <span className="online-dot"></span>}
                    </div>
                    <div className="conv-content">
                      <div className="conv-header">
                        <h3 className="conv-name">{conv.name}</h3>
                        <span className="conv-time">{conv.time}</span>
                      </div>
                      <p className="conv-last-message">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="unread-badge">{conv.unread}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            {!activeChat && (
              <div className="quick-actions">
                <button className="action-btn">
                  <span>👥</span>
                  <span>Create Group</span>
                </button>
                <button className="action-btn">
                  <span>📢</span>
                  <span>Broadcast</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Messages; 