import { getDummySports, getDummyScoresBySport, getAllDummyScores } from './dummyData';

// Use Next.js API routes (which fetch from Google Sheets)
// Falls back to dummy data if Google Sheets API is not configured
const USE_DUMMY_DATA = !process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL || 
                       process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL === '';

/**
 * Fetches the list of all available sports
 * Client-side function for use in React components
 * Uses Next.js API route which fetches from Google Sheets via Apps Script
 * Falls back to dummy data if Google Sheets API is not configured
 */
export async function fetchSports() {
  if (USE_DUMMY_DATA) {
    console.log('📦 Using dummy data for sports (NEXT_PUBLIC_GOOGLE_SHEETS_API_URL not set)');
    return getDummySports();
  }

  try {
    const res = await fetch('/api/sports', {
      cache: 'no-store', // Always fetch fresh data on client
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch sports');
    }
    return res.json();
  } catch (error) {
    console.warn('⚠️ API fetch failed, falling back to dummy data:', error);
    return getDummySports();
  }
}

/**
 * Fetches scores for a specific sport
 * Client-side function for use in React components
 * Uses Next.js API route which fetches from Google Sheets via Apps Script
 * Falls back to dummy data if Google Sheets API is not configured
 */
export async function fetchScoresBySport(sportName: string) {
  if (USE_DUMMY_DATA) {
    console.log(`📦 Using dummy data for ${sportName} scores (NEXT_PUBLIC_GOOGLE_SHEETS_API_URL not set)`);
    return getDummyScoresBySport(sportName);
  }

  try {
    const res = await fetch(`/api/scores?sport=${encodeURIComponent(sportName)}`, {
      cache: 'no-store', // Always fetch fresh data on client
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch scores for ${sportName}`);
    }
    return res.json();
  } catch (error) {
    console.warn(`⚠️ API fetch failed for ${sportName}, falling back to dummy data:`, error);
    return getDummyScoresBySport(sportName);
  }
}

/**
 * Fetches all matches from all sports
 * Client-side function for use in React components
 * Uses Next.js API route which fetches from Google Sheets via Apps Script
 * Falls back to dummy data if Google Sheets API is not configured
 */
export async function fetchAllScores() {
  if (USE_DUMMY_DATA) {
    console.log('📦 Using dummy data for all scores (NEXT_PUBLIC_GOOGLE_SHEETS_API_URL not set)');
    return getAllDummyScores();
  }

  try {
    const res = await fetch('/api/scores', {
      cache: 'no-store', // Always fetch fresh data on client
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch all scores');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('⚠️ API fetch failed for all scores, falling back to dummy data:', error);
    return getAllDummyScores();
  }
}
