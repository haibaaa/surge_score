/**
 * Google Apps Script for Surge Score Portal
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete the default code and paste this entire file
 * 4. Update the SPREADSHEET_ID and SHEET_NAME variables below
 * 5. Save the project (Ctrl+S or Cmd+S)
 * 6. Click "Deploy" > "New deployment"
 * 7. Select type: "Web app"
 * 8. Execute as: "Me"
 * 9. Who has access: "Anyone" (or "Anyone with Google account" for more security)
 * 10. Click "Deploy"
 * 11. Copy the Web App URL and use it as NEXT_PUBLIC_GOOGLE_SHEETS_API_URL in your .env.local
 * 
 * GOOGLE SHEET STRUCTURE:
 * Your sheet should have the following columns (in order):
 * - Sport (column A)
 * - Date (column B)
 * - Team1 (column C)
 * - Team2 (column D)
 * - Winner (column E)
 * - MatchType (column F)
 * - Points (column G)
 * - TimeSlot (column H) - Optional: Read but NOT displayed on frontend
 * 
 * Row 1 should be headers, data starts from row 2
 * Note: TimeSlot column is read from the sheet but excluded from the API response
 */

// ========== CONFIGURATION ==========
// Replace with your Google Sheet ID (found in the URL)
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

// Replace with your sheet name (usually "Sheet1" or the tab name)
const SHEET_NAME = 'Sheet1';

// ========== MAIN FUNCTIONS ==========

/**
 * Main function to handle GET requests
 * Supports endpoints:
 * - /sports - Returns list of all sports
 * - /scores - Returns all scores (optionally filtered by ?sport=SportName)
 */
function doGet(e) {
  try {
    const path = e.parameter.path || '';
    const sport = e.parameter.sport || '';
    
    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Sheet not found: ' + SHEET_NAME
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get all data from the sheet
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    // Skip header row
    const headers = values[0];
    const rows = values.slice(1);
    
    // Parse data into structured format
    const matches = [];
    const sportsSet = new Set();
    
    rows.forEach((row, index) => {
      // Skip empty rows
      if (!row[0] || row[0].toString().trim() === '') return;
      
      // Read time slot (column H) but don't include it in the response
      // This allows you to store time slot data in the sheet without displaying it
      const timeSlot = row[7] ? row[7].toString().trim() : '';
      
      const match = {
        id: index + 1,
        sport: row[0] ? row[0].toString().trim() : '',
        date: row[1] ? formatDate(row[1]) : '',
        team1: row[2] ? row[2].toString().trim() : '',
        team2: row[3] ? row[3].toString().trim() : '',
        winner: row[4] ? row[4].toString().trim() : '',
        matchType: row[5] ? row[5].toString().trim() : '',
        points: row[6] ? row[6].toString().trim() : ''
        // Note: timeSlot is read but intentionally NOT included in the response
      };
      
      if (match.sport) {
        sportsSet.add(match.sport);
        matches.push(match);
      }
    });
    
    // Handle different endpoints
    if (path === 'sports' || e.parameter.path === 'sports') {
      // Return list of sports
      const sports = Array.from(sportsSet).sort();
      return ContentService.createTextOutput(JSON.stringify(sports))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Filter by sport if specified
    let filteredMatches = matches;
    if (sport && sport !== '') {
      filteredMatches = matches.filter(m => 
        m.sport.toLowerCase() === sport.toLowerCase()
      );
    }
    
    // Return scores
    if (sport && sport !== '') {
      // Return only the matches array for a specific sport
      return ContentService.createTextOutput(JSON.stringify(filteredMatches))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      // Return all matches with sport field included
      return ContentService.createTextOutput(JSON.stringify(filteredMatches))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString(),
      message: 'Failed to fetch data from Google Sheet'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Helper function to format dates
 * Handles both Date objects and date strings
 */
function formatDate(dateValue) {
  if (!dateValue) return '';
  
  // If it's already a string, return it
  if (typeof dateValue === 'string') {
    return dateValue;
  }
  
  // If it's a Date object, format it
  if (dateValue instanceof Date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[dateValue.getMonth()];
    const day = dateValue.getDate();
    const year = dateValue.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  
  return dateValue.toString();
}

/**
 * Test function - run this in Apps Script editor to test your setup
 */
function testScript() {
  const testEvent = {
    parameter: {
      path: 'sports'
    }
  };
  
  const result = doGet(testEvent);
  Logger.log(result.getContent());
}

