import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_SHEETS_API_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL || '';

/**
 * GET /api/scores
 * Fetches scores from Google Sheets via Apps Script
 * Query params:
 * - sport: (optional) Filter by specific sport name
 */
export async function GET(request: NextRequest) {
  if (!GOOGLE_SHEETS_API_URL) {
    return NextResponse.json(
      { error: 'Google Sheets API URL not configured. Please set NEXT_PUBLIC_GOOGLE_SHEETS_API_URL in .env.local' },
      { status: 500 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const sport = searchParams.get('sport');

    // Build URL with query parameters
    let url = GOOGLE_SHEETS_API_URL;
    if (sport) {
      url += `?sport=${encodeURIComponent(sport)}`;
    }

    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    const responseText = await response.text();

    if (!response.ok) {
      console.error('Google Sheets API error response:', responseText.substring(0, 200));
      throw new Error(`Google Sheets API returned ${response.status}: ${responseText.substring(0, 100)}`);
    }
    
    // If response is HTML, it's likely an error page or authorization issue
    if (!contentType || !contentType.includes('application/json')) {
      if (responseText.trim().startsWith('<!doctype') || responseText.trim().startsWith('<!DOCTYPE')) {
        console.error('Google Apps Script returned HTML instead of JSON. This usually means:');
        console.error('1. The script needs authorization - check Apps Script deployment settings');
        console.error('2. The Web App URL is incorrect');
        console.error('3. The script has an error');
        console.error('Response preview:', responseText.substring(0, 500));
        throw new Error('Google Apps Script returned HTML instead of JSON. Please check: 1) Script authorization, 2) Deployment settings (set to "Anyone"), 3) Web App URL is correct');
      }
      throw new Error(`Unexpected content type: ${contentType}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', responseText.substring(0, 500));
      throw new Error('Invalid JSON response from Google Apps Script');
    }
    
    // Handle error response from Apps Script
    if (data.error) {
      return NextResponse.json(
        { error: data.error },
        { status: 500 }
      );
    }

    // If data is an array, return it directly
    // If it's a single object with error, return error
    if (Array.isArray(data)) {
      return NextResponse.json(data);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching scores from Google Sheets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scores from Google Sheets', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

