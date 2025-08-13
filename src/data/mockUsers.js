// Mock users data for cricket application
export const generateMockUsers = () => {
  const names = [
    'Rohit Sharma', 'Virat Kohli', 'KL Rahul', 'Hardik Pandya', 'Ravindra Jadeja',
    'MS Dhoni', 'Jasprit Bumrah', 'Shikhar Dhawan', 'Rishabh Pant', 'Mohammed Shami',
    'Yuzvendra Chahal', 'Shreyas Iyer', 'Ishan Kishan', 'Axar Patel', 'Bhuvneshwar Kumar',
    'Prithvi Shaw', 'Deepak Chahar', 'Kuldeep Yadav', 'Sanju Samson', 'Ruturaj Gaikwad',
    'Devdutt Padikkal', 'Prasidh Krishna', 'Nitish Rana', 'Suryakumar Yadav', 'Washington Sundar',
    'Shardul Thakur', 'Varun Chakravarthy', 'Rahul Tewatia', 'Deepak Hooda', 'Arshdeep Singh'
  ];

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad',
    'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal', 'Visakhapatnam', 'Kochi'
  ];

  const teams = [
    'Mumbai Indians', 'Chennai Super Kings', 'Royal Challengers Bangalore',
    'Delhi Capitals', 'Kolkata Knight Riders', 'Punjab Kings',
    'Rajasthan Royals', 'Sunrisers Hyderabad'
  ];

  const playerTypes = ['batsman', 'bowler', 'allrounder', 'wicketkeeper'];
  const battingStyles = ['right', 'left'];
  const bowlingStyles = ['right-fast', 'left-fast', 'right-spin', 'left-spin', 'none'];
  const experienceLevels = ['beginner', 'intermediate', 'experienced', 'professional'];

  const generateMobileNumber = (index) => {
    const baseNumber = 9000000000;
    return (baseNumber + index + 123).toString();
  };

  const generateDateOfBirth = () => {
    const year = 1990 + Math.floor(Math.random() * 15); // Ages 18-32
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const mockUsers = names.map((name, index) => {
    const playerType = playerTypes[Math.floor(Math.random() * playerTypes.length)];
    const battingStyle = battingStyles[Math.floor(Math.random() * battingStyles.length)];
    
    let bowlingStyle = 'none';
    if (playerType === 'bowler' || playerType === 'allrounder') {
      const availableBowlingStyles = bowlingStyles.filter(style => style !== 'none');
      bowlingStyle = availableBowlingStyles[Math.floor(Math.random() * availableBowlingStyles.length)];
    }

    const mobile = generateMobileNumber(index);
    
    return {
      id: (Date.now() + index).toString(),
      name,
      mobile,
      password: 'cricket123', // Default password for all mock users
      playerType,
      battingStyle,
      bowlingStyle,
      dateOfBirth: generateDateOfBirth(),
      city: cities[Math.floor(Math.random() * cities.length)],
      experience: experienceLevels[Math.floor(Math.random() * experienceLevels.length)],
      favoriteTeam: teams[Math.floor(Math.random() * teams.length)],
      registeredAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a5f7a&color=fff`,
      
      // Additional cricket stats (for profile display)
      stats: {
        matchesPlayed: Math.floor(Math.random() * 100) + 10,
        runsScored: Math.floor(Math.random() * 2000) + 100,
        wicketsTaken: playerType === 'batsman' ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * 50) + 5,
        catches: Math.floor(Math.random() * 30) + 5,
        bestScore: Math.floor(Math.random() * 100) + 20,
        bestBowling: playerType === 'batsman' ? '1/15' : `${Math.floor(Math.random() * 5) + 2}/${Math.floor(Math.random() * 30) + 10}`,
        average: (Math.random() * 30 + 15).toFixed(2),
        strikeRate: (Math.random() * 50 + 100).toFixed(2)
      },
      
      // Team affiliations
      currentTeam: null,
      teamHistory: [],
      
      // Preferences
      preferences: {
        notifications: true,
        publicProfile: true,
        availableForMatches: true
      }
    };
  });

  return mockUsers;
};

// Create a specific test user with guaranteed complete data
export const createTestUser = () => {
  return {
    id: 'test-user-001',
    name: 'Test Cricket Player',
    mobile: '9999999999',
    password: 'test123',
    playerType: 'allrounder',
    battingStyle: 'right',
    bowlingStyle: 'right-fast',
    dateOfBirth: '1995-06-15',
    city: 'Mumbai',
    experience: 'experienced',
    favoriteTeam: 'Mumbai Indians',
    registeredAt: new Date().toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=Test+Cricket+Player&background=1a5f7a&color=fff',
    
    // Complete cricket stats
    stats: {
      matchesPlayed: 85,
      runsScored: 2847,
      wicketsTaken: 42,
      catches: 23,
      bestScore: 126,
      bestBowling: '4/32',
      average: '42.85',
      strikeRate: '135.60'
    },
    
    // Team affiliations
    currentTeam: null,
    teamHistory: [],
    
    // Preferences
    preferences: {
      notifications: true,
      publicProfile: true,
      availableForMatches: true
    }
  };
};

// Initialize mock users in localStorage if not already present
export const initializeMockUsers = () => {
  const existingUsers = localStorage.getItem('cricketUsers');
  if (!existingUsers) {
    const mockUsers = generateMockUsers();
    const testUser = createTestUser();
    
    // Add test user to the beginning of the array
    const allUsers = [testUser, ...mockUsers];
    
    localStorage.setItem('cricketUsers', JSON.stringify(allUsers));
    console.log('🏏 Initialized 31 mock cricket users (including test user)');
    console.log('🎯 Test credentials: Mobile: 9999999999, Password: test123');
    return allUsers;
  }
  return JSON.parse(existingUsers);
};

// Get user by mobile number
export const getUserByMobile = (mobile) => {
  const users = JSON.parse(localStorage.getItem('cricketUsers') || '[]');
  return users.find(user => user.mobile === mobile);
};

// Update user data
export const updateUser = (userId, updates) => {
  const users = JSON.parse(localStorage.getItem('cricketUsers') || '[]');
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates };
    localStorage.setItem('cricketUsers', JSON.stringify(users));
    
    // Update current user if it's the same user
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.id === userId) {
      localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
    }
    
    return users[userIndex];
  }
  
  return null;
};

// Get all users
export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem('cricketUsers') || '[]');
};

// Search users by name or mobile
export const searchUsers = (query) => {
  const users = getAllUsers();
  const searchTerm = query.toLowerCase();
  
  return users.filter(user => 
    user.name.toLowerCase().includes(searchTerm) ||
    user.mobile.includes(searchTerm) ||
    user.city.toLowerCase().includes(searchTerm)
  );
}; 