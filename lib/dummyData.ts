/**
 * Dummy Dataset for Testing
 * This file contains mock data that matches the API structure
 */

// Sports list - array of sport names
export const dummySports: string[] = [
  "Badminton",
  "Cricket",
  "Football",
  "Volleyball",
  "Chess",
  "Basketball",
  "Tennis"
];

// Scores data - matches organized by sport name
export const dummyScores: Record<string, Array<{
  id: number;
  date: string;
  team1: string;
  team2: string;
  winner: string;
  matchType: string;
  points: string;
}>> = {
  "Badminton": [
    { id: 1, date: "Nov 4, 2025", team1: "V. Axelsen", team2: "L. Zii Jia", winner: "V. Axelsen", matchType: "Singles", points: "21-19, 21-15" },
    { id: 2, date: "Nov 3, 2025", team1: "C. Marin", team2: "P. V. Sindhu", winner: "C. Marin", matchType: "Singles", points: "21-18, 19-21, 21-16" },
    { id: 3, date: "Nov 2, 2025", team1: "K. Momota", team2: "A. Antonsen", winner: "K. Momota", matchType: "Singles", points: "21-14, 21-17" },
    { id: 4, date: "Nov 1, 2025", team1: "T. Y. Lin", team2: "J. Christie", winner: "J. Christie", matchType: "Singles", points: "18-21, 21-19, 21-18" },
  ],
  "Cricket": [
    { id: 1, date: "Nov 5, 2025", team1: "Team Alpha", team2: "Team Beta", winner: "Team Alpha", matchType: "T20", points: "145/6 - 142/8" },
    { id: 2, date: "Nov 4, 2025", team1: "Team Gamma", team2: "Team Delta", winner: "Team Gamma", matchType: "ODI", points: "287/5 - 265/9" },
    { id: 3, date: "Nov 3, 2025", team1: "Team Epsilon", team2: "Team Zeta", winner: "Team Zeta", matchType: "T20", points: "168/4 - 170/3" },
    { id: 4, date: "Nov 2, 2025", team1: "Team Alpha", team2: "Team Gamma", winner: "Team Alpha", matchType: "ODI", points: "312/7 - 298/10" },
    { id: 5, date: "Nov 1, 2025", team1: "Team Beta", team2: "Team Delta", winner: "Draw", matchType: "Test", points: "Match Abandoned" },
  ],
  "Football": [
    { id: 1, date: "Nov 5, 2025", team1: "FC Warriors", team2: "FC Legends", winner: "FC Warriors", matchType: "League", points: "3-1" },
    { id: 2, date: "Nov 4, 2025", team1: "FC Titans", team2: "FC Phoenix", winner: "FC Phoenix", matchType: "Cup", points: "2-0" },
    { id: 3, date: "Nov 3, 2025", team1: "FC Eagles", team2: "FC Sharks", winner: "FC Eagles", matchType: "League", points: "4-2" },
    { id: 4, date: "Nov 2, 2025", team1: "FC Warriors", team2: "FC Titans", winner: "Draw", matchType: "League", points: "1-1" },
    { id: 5, date: "Nov 1, 2025", team1: "FC Legends", team2: "FC Eagles", winner: "FC Legends", matchType: "Cup", points: "2-1" },
  ],
  "Volleyball": [
    { id: 1, date: "Nov 4, 2025", team1: "Spike Masters", team2: "Net Warriors", winner: "Spike Masters", matchType: "Best of 3", points: "3-1" },
    { id: 2, date: "Nov 3, 2025", team1: "Blockers United", team2: "Serving Stars", winner: "Blockers United", matchType: "Best of 3", points: "3-0" },
    { id: 3, date: "Nov 2, 2025", team1: "Spike Masters", team2: "Blockers United", winner: "Spike Masters", matchType: "Best of 5", points: "3-2" },
    { id: 4, date: "Nov 1, 2025", team1: "Net Warriors", team2: "Serving Stars", winner: "Net Warriors", matchType: "Best of 3", points: "3-1" },
  ],
  "Chess": [
    { id: 1, date: "Nov 5, 2025", team1: "M. Carlsen", team2: "D. Nepomniachtchi", winner: "M. Carlsen", matchType: "Classical", points: "1-0" },
    { id: 2, date: "Nov 4, 2025", team1: "H. Nakamura", team2: "F. Caruana", winner: "H. Nakamura", matchType: "Rapid", points: "1-0" },
    { id: 3, date: "Nov 3, 2025", team1: "A. Giri", team2: "V. Anand", winner: "V. Anand", matchType: "Blitz", points: "1-0" },
    { id: 4, date: "Nov 2, 2025", team1: "M. Carlsen", team2: "H. Nakamura", winner: "Draw", matchType: "Classical", points: "0.5-0.5" },
    { id: 5, date: "Nov 1, 2025", team1: "D. Nepomniachtchi", team2: "F. Caruana", winner: "F. Caruana", matchType: "Rapid", points: "1-0" },
  ],
  "Basketball": [
    { id: 1, date: "Nov 4, 2025", team1: "Lakers", team2: "Warriors", winner: "Lakers", matchType: "Regular", points: "112-108" },
    { id: 2, date: "Nov 3, 2025", team1: "Nets", team2: "Celtics", winner: "Celtics", matchType: "Playoff", points: "98-95" },
    { id: 3, date: "Nov 2, 2025", team1: "Suns", team2: "Bucks", winner: "Bucks", matchType: "Regular", points: "105-102" },
    { id: 4, date: "Nov 1, 2025", team1: "Heat", team2: "Mavericks", winner: "Heat", matchType: "Playoff", points: "115-110" },
  ],
  "Tennis": [
    { id: 1, date: "Nov 4, 2025", team1: "R. Nadal", team2: "N. Djokovic", winner: "N. Djokovic", matchType: "Singles", points: "6-4, 4-6, 7-5" },
    { id: 2, date: "Nov 3, 2025", team1: "I. Swiatek", team2: "A. Sabalenka", winner: "I. Swiatek", matchType: "Singles", points: "6-3, 6-2" },
    { id: 3, date: "Nov 2, 2025", team1: "C. Alcaraz", team2: "D. Medvedev", winner: "C. Alcaraz", matchType: "Singles", points: "7-6, 6-4" },
    { id: 4, date: "Nov 1, 2025", team1: "E. Rybakina", team2: "A. Gauff", winner: "E. Rybakina", matchType: "Singles", points: "6-4, 6-3" },
  ],
};

/**
 * Simulate API delay for testing
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get sports list (simulated API call)
 */
export async function getDummySports(): Promise<string[]> {
  await delay(500); // Simulate network delay
  return dummySports;
}

/**
 * Get scores for a specific sport (simulated API call)
 */
export async function getDummyScoresBySport(sportName: string): Promise<Array<{
  id: number;
  date: string;
  team1: string;
  team2: string;
  winner: string;
  matchType: string;
  points: string;
}>> {
  await delay(800); // Simulate network delay
  return dummyScores[sportName] || [];
}

/**
 * Get all matches from all sports (simulated API call)
 */
export async function getAllDummyScores(): Promise<Array<{
  id: number;
  date: string;
  team1: string;
  team2: string;
  winner: string;
  matchType: string;
  points: string;
  sport: string;
}>> {
  await delay(1000); // Simulate network delay
  const allMatches: Array<{
    id: number;
    date: string;
    team1: string;
    team2: string;
    winner: string;
    matchType: string;
    points: string;
    sport: string;
  }> = [];
  
  // Combine all matches from all sports
  for (const sport of dummySports) {
    const matches = dummyScores[sport] || [];
    matches.forEach(match => {
      allMatches.push({
        ...match,
        sport: sport
      });
    });
  }
  
  // Sort by date (newest first)
  return allMatches.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

