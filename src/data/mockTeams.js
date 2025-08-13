// Mock teams data for cricket application
export const generateMockTeams = () => {
  const teams = [
    {
      id: 'team-001',
      name: 'Mumbai Fighters',
      createdBy: 'test-user-001', // Test user is the captain
      captain: 'test-user-001',
      description: 'A competitive cricket team from Mumbai looking for local tournaments',
      location: 'Mumbai',
      establishedDate: '2023-01-15',
      teamColor: '#1a5f7a',
      logo: '🏏',
      
      // Team settings
      isPublic: true,
      maxPlayers: 15,
      minAge: 16,
      maxAge: 40,
      
      // Team statistics
      stats: {
        matchesPlayed: 18,
        won: 12,
        lost: 5,
        tied: 1,
        winPercentage: 66.7,
        totalRuns: 2847,
        totalWickets: 142,
        averageScore: 158.2,
        highestScore: 245,
        lowestScore: 89
      },
      
      // Players will be assigned based on mock users
      players: [],
      
      // Match history (basic)
      recentMatches: [
        { opponent: 'Delhi Dynamos', result: 'Won', score: '184/6 vs 181/8', date: '2024-01-15' },
        { opponent: 'Chennai Challengers', result: 'Lost', score: '156/9 vs 159/4', date: '2024-01-08' },
        { opponent: 'Bangalore Bulls', result: 'Won', score: '201/5 vs 198/7', date: '2024-01-01' }
      ]
    },
    
    {
      id: 'team-002',
      name: 'Delhi Dynamos',
      createdBy: '1704067200001', // Will be assigned to first mock user
      captain: '1704067200001',
      description: 'Fast-paced cricket team from Delhi with aggressive playing style',
      location: 'Delhi',
      establishedDate: '2023-03-22',
      teamColor: '#c0392b',
      logo: '⚡',
      
      isPublic: true,
      maxPlayers: 15,
      minAge: 18,
      maxAge: 35,
      
      stats: {
        matchesPlayed: 15,
        won: 9,
        lost: 6,
        tied: 0,
        winPercentage: 60.0,
        totalRuns: 2156,
        totalWickets: 98,
        averageScore: 143.7,
        highestScore: 214,
        lowestScore: 76
      },
      
      players: [],
      
      recentMatches: [
        { opponent: 'Mumbai Fighters', result: 'Lost', score: '181/8 vs 184/6', date: '2024-01-15' },
        { opponent: 'Kolkata Kings', result: 'Won', score: '167/7 vs 164/9', date: '2024-01-10' },
        { opponent: 'Pune Panthers', result: 'Won', score: '189/4 vs 186/8', date: '2024-01-03' }
      ]
    },
    
    {
      id: 'team-003',
      name: 'Chennai Challengers',
      createdBy: '1704067200002', // Will be assigned to second mock user
      captain: '1704067200002',
      description: 'Traditional cricket team from Chennai with strong bowling attack',
      location: 'Chennai',
      establishedDate: '2023-05-10',
      teamColor: '#f39c12',
      logo: '🔥',
      
      isPublic: true,
      maxPlayers: 15,
      minAge: 20,
      maxAge: 45,
      
      stats: {
        matchesPlayed: 12,
        won: 8,
        lost: 3,
        tied: 1,
        winPercentage: 66.7,
        totalRuns: 1876,
        totalWickets: 87,
        averageScore: 156.3,
        highestScore: 198,
        lowestScore: 112
      },
      
      players: [],
      
      recentMatches: [
        { opponent: 'Mumbai Fighters', result: 'Won', score: '159/4 vs 156/9', date: '2024-01-08' },
        { opponent: 'Bangalore Bulls', result: 'Lost', score: '145/8 vs 148/6', date: '2024-01-05' },
        { opponent: 'Hyderabad Heroes', result: 'Won', score: '172/5 vs 169/7', date: '2023-12-28' }
      ]
    }
  ];

  return teams;
};

// Assign players to teams based on location and other factors
export const assignPlayersToTeams = (teams, users) => {
  const teamsWithPlayers = teams.map(team => ({ ...team, players: [] }));
  
  // Create a copy of users to work with
  const availableUsers = [...users];
  
  // First, assign captains
  teamsWithPlayers.forEach(team => {
    const captain = availableUsers.find(user => user.id === team.captain);
    if (captain) {
      team.players.push({
        userId: captain.id,
        name: captain.name,
        role: 'Captain',
        playerType: captain.playerType,
        battingStyle: captain.battingStyle,
        bowlingStyle: captain.bowlingStyle,
        joinedDate: team.establishedDate,
        isActive: true
      });
      
      // Update user's current team
      captain.currentTeam = team.id;
      
      // Remove captain from available users
      const captainIndex = availableUsers.findIndex(user => user.id === captain.id);
      if (captainIndex > -1) {
        availableUsers.splice(captainIndex, 1);
      }
    }
  });
  
  // Then assign other players (4-6 players per team)
  teamsWithPlayers.forEach(team => {
    const playersNeeded = Math.floor(Math.random() * 3) + 4; // 4-6 players per team
    let playersAdded = 0;
    
    // Prefer players from the same city
    const localPlayers = availableUsers.filter(user => 
      user.city === team.location && playersAdded < playersNeeded
    );
    
    // Add local players first
    localPlayers.slice(0, Math.min(localPlayers.length, playersNeeded)).forEach(user => {
      team.players.push({
        userId: user.id,
        name: user.name,
        role: 'Player',
        playerType: user.playerType,
        battingStyle: user.battingStyle,
        bowlingStyle: user.bowlingStyle,
        joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isActive: true
      });
      
      // Update user's current team
      user.currentTeam = team.id;
      
      // Remove from available users
      const userIndex = availableUsers.findIndex(u => u.id === user.id);
      if (userIndex > -1) {
        availableUsers.splice(userIndex, 1);
      }
      
      playersAdded++;
    });
    
    // Fill remaining slots with players from other cities
    while (playersAdded < playersNeeded && availableUsers.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableUsers.length);
      const user = availableUsers[randomIndex];
      
      team.players.push({
        userId: user.id,
        name: user.name,
        role: 'Player',
        playerType: user.playerType,
        battingStyle: user.battingStyle,
        bowlingStyle: user.bowlingStyle,
        joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isActive: true
      });
      
      // Update user's current team
      user.currentTeam = team.id;
      
      // Remove from available users
      availableUsers.splice(randomIndex, 1);
      playersAdded++;
    }
  });
  
  return teamsWithPlayers;
};

// Initialize teams and assign players
export const initializeMockTeams = (users) => {
  const existingTeams = localStorage.getItem('cricketTeams');
  
  if (!existingTeams) {
    const teams = generateMockTeams();
    const teamsWithPlayers = assignPlayersToTeams(teams, users);
    
    localStorage.setItem('cricketTeams', JSON.stringify(teamsWithPlayers));
    
    // Update users with their team assignments
    localStorage.setItem('cricketUsers', JSON.stringify(users));
    
    console.log('🏆 Initialized 3 mock cricket teams with assigned players');
    return teamsWithPlayers;
  }
  
  return JSON.parse(existingTeams);
};

// Get all teams
export const getAllTeams = () => {
  return JSON.parse(localStorage.getItem('cricketTeams') || '[]');
};

// Get user's team
export const getUserTeam = (userId) => {
  const teams = getAllTeams();
  return teams.find(team => 
    team.players.some(player => player.userId === userId)
  );
};

// Create new team
export const createTeam = (teamData, captainId) => {
  const teams = getAllTeams();
  const newTeam = {
    id: `team-${Date.now()}`,
    ...teamData,
    createdBy: captainId,
    captain: captainId,
    establishedDate: new Date().toISOString().split('T')[0],
    
    stats: {
      matchesPlayed: 0,
      won: 0,
      lost: 0,
      tied: 0,
      winPercentage: 0,
      totalRuns: 0,
      totalWickets: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0
    },
    
    players: [{
      userId: captainId,
      name: teamData.captainName,
      role: 'Captain',
      playerType: teamData.captainPlayerType,
      battingStyle: teamData.captainBattingStyle,
      bowlingStyle: teamData.captainBowlingStyle,
      joinedDate: new Date().toISOString().split('T')[0],
      isActive: true
    }],
    
    recentMatches: []
  };
  
  teams.push(newTeam);
  localStorage.setItem('cricketTeams', JSON.stringify(teams));
  
  // Update user's current team
  const users = JSON.parse(localStorage.getItem('cricketUsers') || '[]');
  const userIndex = users.findIndex(user => user.id === captainId);
  if (userIndex > -1) {
    users[userIndex].currentTeam = newTeam.id;
    localStorage.setItem('cricketUsers', JSON.stringify(users));
  }
  
  return newTeam;
};

// Add player to team
export const addPlayerToTeam = (teamId, userId, role = 'Player') => {
  const teams = getAllTeams();
  const users = JSON.parse(localStorage.getItem('cricketUsers') || '[]');
  
  const teamIndex = teams.findIndex(team => team.id === teamId);
  const user = users.find(u => u.id === userId);
  
  if (teamIndex > -1 && user && !user.currentTeam) {
    const team = teams[teamIndex];
    
    // Check if team has space
    if (team.players.length < team.maxPlayers) {
      team.players.push({
        userId: user.id,
        name: user.name,
        role: role,
        playerType: user.playerType,
        battingStyle: user.battingStyle,
        bowlingStyle: user.bowlingStyle,
        joinedDate: new Date().toISOString().split('T')[0],
        isActive: true
      });
      
      // Update user's current team
      const userIndex = users.findIndex(u => u.id === userId);
      users[userIndex].currentTeam = teamId;
      
      localStorage.setItem('cricketTeams', JSON.stringify(teams));
      localStorage.setItem('cricketUsers', JSON.stringify(users));
      
      return true;
    }
  }
  
  return false;
};

// Remove player from team
export const removePlayerFromTeam = (teamId, userId) => {
  const teams = getAllTeams();
  const users = JSON.parse(localStorage.getItem('cricketUsers') || '[]');
  
  const teamIndex = teams.findIndex(team => team.id === teamId);
  
  if (teamIndex > -1) {
    const team = teams[teamIndex];
    const playerIndex = team.players.findIndex(player => player.userId === userId);
    
    if (playerIndex > -1) {
      team.players.splice(playerIndex, 1);
      
      // Update user's current team
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex > -1) {
        users[userIndex].currentTeam = null;
      }
      
      localStorage.setItem('cricketTeams', JSON.stringify(teams));
      localStorage.setItem('cricketUsers', JSON.stringify(users));
      
      return true;
    }
  }
  
  return false;
}; 