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
}>> = {
  "Badminton": [
    { id: 1, date: "Nov 4, 2025", team1: "V. Axelsen", team2: "L. Zii Jia", winner: "V. Axelsen" },
    { id: 2, date: "Nov 3, 2025", team1: "C. Marin", team2: "P. V. Sindhu", winner: "C. Marin" },
    { id: 3, date: "Nov 2, 2025", team1: "K. Momota", team2: "A. Antonsen", winner: "K. Momota" },
    { id: 4, date: "Nov 1, 2025", team1: "T. Y. Lin", team2: "J. Christie", winner: "J. Christie" },
  ],
  "Cricket": [
    { id: 1, date: "Nov 5, 2025", team1: "Team Alpha", team2: "Team Beta", winner: "Team Alpha" },
    { id: 2, date: "Nov 4, 2025", team1: "Team Gamma", team2: "Team Delta", winner: "Team Gamma" },
    { id: 3, date: "Nov 3, 2025", team1: "Team Epsilon", team2: "Team Zeta", winner: "Team Zeta" },
    { id: 4, date: "Nov 2, 2025", team1: "Team Alpha", team2: "Team Gamma", winner: "Team Alpha" },
    { id: 5, date: "Nov 1, 2025", team1: "Team Beta", team2: "Team Delta", winner: "Draw" },
  ],
  "Football": [
    { id: 1, date: "Nov 5, 2025", team1: "FC Warriors", team2: "FC Legends", winner: "FC Warriors" },
    { id: 2, date: "Nov 4, 2025", team1: "FC Titans", team2: "FC Phoenix", winner: "FC Phoenix" },
    { id: 3, date: "Nov 3, 2025", team1: "FC Eagles", team2: "FC Sharks", winner: "FC Eagles" },
    { id: 4, date: "Nov 2, 2025", team1: "FC Warriors", team2: "FC Titans", winner: "Draw" },
    { id: 5, date: "Nov 1, 2025", team1: "FC Legends", team2: "FC Eagles", winner: "FC Legends" },
  ],
  "Volleyball": [
    { id: 1, date: "Nov 4, 2025", team1: "Spike Masters", team2: "Net Warriors", winner: "Spike Masters" },
    { id: 2, date: "Nov 3, 2025", team1: "Blockers United", team2: "Serving Stars", winner: "Blockers United" },
    { id: 3, date: "Nov 2, 2025", team1: "Spike Masters", team2: "Blockers United", winner: "Spike Masters" },
    { id: 4, date: "Nov 1, 2025", team1: "Net Warriors", team2: "Serving Stars", winner: "Net Warriors" },
  ],
  "Chess": [
    { id: 1, date: "Nov 5, 2025", team1: "M. Carlsen", team2: "D. Nepomniachtchi", winner: "M. Carlsen" },
    { id: 2, date: "Nov 4, 2025", team1: "H. Nakamura", team2: "F. Caruana", winner: "H. Nakamura" },
    { id: 3, date: "Nov 3, 2025", team1: "A. Giri", team2: "V. Anand", winner: "V. Anand" },
    { id: 4, date: "Nov 2, 2025", team1: "M. Carlsen", team2: "H. Nakamura", winner: "Draw" },
    { id: 5, date: "Nov 1, 2025", team1: "D. Nepomniachtchi", team2: "F. Caruana", winner: "F. Caruana" },
  ],
  "Basketball": [
    { id: 1, date: "Nov 4, 2025", team1: "Lakers", team2: "Warriors", winner: "Lakers" },
    { id: 2, date: "Nov 3, 2025", team1: "Nets", team2: "Celtics", winner: "Celtics" },
    { id: 3, date: "Nov 2, 2025", team1: "Suns", team2: "Bucks", winner: "Bucks" },
    { id: 4, date: "Nov 1, 2025", team1: "Heat", team2: "Mavericks", winner: "Heat" },
  ],
  "Tennis": [
    { id: 1, date: "Nov 4, 2025", team1: "R. Nadal", team2: "N. Djokovic", winner: "N. Djokovic" },
    { id: 2, date: "Nov 3, 2025", team1: "I. Swiatek", team2: "A. Sabalenka", winner: "I. Swiatek" },
    { id: 3, date: "Nov 2, 2025", team1: "C. Alcaraz", team2: "D. Medvedev", winner: "C. Alcaraz" },
    { id: 4, date: "Nov 1, 2025", team1: "E. Rybakina", team2: "A. Gauff", winner: "E. Rybakina" },
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
}>> {
  await delay(800); // Simulate network delay
  return dummyScores[sportName] || [];
}

