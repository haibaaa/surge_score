import { getDummySports, getDummyScoresBySport } from './dummyData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Use dummy data if API URL is not set (for development/testing)
const USE_DUMMY_DATA = !API_BASE_URL || API_BASE_URL === '';

/**
 * Fetches the list of all available sports
 * Client-side function for use in React components
 * Falls back to dummy data if API_URL is not configured
 */
export async function fetchSports() {
  if (USE_DUMMY_DATA) {
    console.log('📦 Using dummy data for sports (NEXT_PUBLIC_API_URL not set)');
    return getDummySports();
  }

  try {
    const res = await fetch(`${API_BASE_URL}/sports`, {
      cache: 'no-store', // Always fetch fresh data on client
    });
    if (!res.ok) throw new Error('Failed to fetch sports');
    return res.json();
  } catch (error) {
    console.warn('⚠️ API fetch failed, falling back to dummy data:', error);
    return getDummySports();
  }
}

/**
 * Fetches scores for a specific sport
 * Client-side function for use in React components
 * Falls back to dummy data if API_URL is not configured
 */
export async function fetchScoresBySport(sportName: string) {
  if (USE_DUMMY_DATA) {
    console.log(`📦 Using dummy data for ${sportName} scores (NEXT_PUBLIC_API_URL not set)`);
    return getDummyScoresBySport(sportName);
  }

  try {
    const res = await fetch(`${API_BASE_URL}/scores?sport=${encodeURIComponent(sportName)}`, {
      cache: 'no-store', // Always fetch fresh data on client
    });
    if (!res.ok) throw new Error(`Failed to fetch scores for ${sportName}`);
    return res.json();
  } catch (error) {
    console.warn(`⚠️ API fetch failed for ${sportName}, falling back to dummy data:`, error);
    return getDummyScoresBySport(sportName);
  }
}
