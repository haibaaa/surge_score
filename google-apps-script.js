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
 * - TimeSlot (column H) - Format: "HHMM-HHMM" (e.g., "1300-1400"), start time is left of '-'
 *
 * Row 1 should be headers, data starts from row 2
 * Only past/completed matches are returned (future hidden); past dates always visible
 * TimeSlot is parsed but only startTime ("HH:MM") is included in response for included matches
 */
// ========== CONFIGURATION ==========
// Replace with your Google Sheet ID (found in the URL)
const SPREADSHEET_ID = '1lk1aZBfEYsYtmxHD6a2-BLLnv9_lDpioBWxG4CfnPdc';
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
    const sportsSet = new Set();
    const includedMatches = [];
    const now = new Date();
    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Today at 00:00:00
   
    rows.forEach((row, index) => {
      // Skip empty rows
      if (!row[0] || row[0].toString().trim() === '') return;
     
      // Parse date (column B) - handle Date or string
      const dateValue = row[1];
      let parsedDate = null;
      if (dateValue instanceof Date) {
        parsedDate = new Date(dateValue); // Clone to avoid mutation
      } else if (typeof dateValue === 'string') {
        parsedDate = new Date(dateValue.trim());
        if (isNaN(parsedDate.getTime())) {
          // Fallback: try parsing common formats (e.g., "Wed Jun 11 2025")
          const parts = dateValue.match(/(\w{3}) (\w{3}) (\d{1,2}) (\d{4})/i);
          if (parts) {
            const months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6,
                             aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
            const month = months[parts[2].toLowerCase().substring(0, 3)];
            if (!isNaN(month)) {
              parsedDate = new Date(parseInt(parts[4]), month, parseInt(parts[3]));
            }
          }
        }
      }
      // If still invalid, treat as past (include) to avoid hiding data
      if (!parsedDate || isNaN(parsedDate.getTime())) {
        parsedDate = new Date(0); // Epoch, definitely past
      }
     
      // Parse time slot (column H)
      const timeSlotStr = row[7] ? row[7].toString().trim() : '';
      let startTimeObj = null;
      if (timeSlotStr.includes('-')) {
        const parts = timeSlotStr.split('-');
        const startStr = parts[0].trim();
        if (startStr.length === 4 && /^\d{4}$/.test(startStr)) {
          const hh = parseInt(startStr.substring(0, 2));
          const mm = parseInt(startStr.substring(2, 4));
          if (hh >= 0 && hh < 24 && mm >= 0 && mm < 60) {
            startTimeObj = { hh, mm };
          }
        }
      }
     
      const baseMatch = {
        id: index + 1,
        sport: row[0] ? row[0].toString().trim() : '',
        date: dateValue ? formatDate(dateValue) : '',
        team1: row[2] ? row[2].toString().trim() : '',
        team2: row[3] ? row[3].toString().trim() : '',
        winner: row[4] ? row[4].toString().trim() : '',
        matchType: row[5] ? row[5].toString().trim() : '',
        points: row[6] ? row[6].toString().trim() : ''
      };
     
      if (baseMatch.sport) {
        sportsSet.add(baseMatch.sport);
      }
     
      // Determine if match should be included (not future)
      let includeMatch = false;
      let fullMatchTime = null;
      let startTimeStr = '';
     
      const matchDateOnly = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
     
      if (matchDateOnly < currentDate) {
        // Past date: always include
        includeMatch = true;
        if (startTimeObj) {
          const hhStr = String(startTimeObj.hh).padStart(2, '0');
          const mmStr = String(startTimeObj.mm).padStart(2, '0');
          startTimeStr = `${hhStr}:${mmStr}`;
          // For sorting, construct full time (even for past date)
          fullMatchTime = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), startTimeObj.hh, startTimeObj.mm);
        } else {
          // No time: use date at 00:00 for sorting
          fullMatchTime = matchDateOnly;
        }
      } else if (matchDateOnly.getTime() === currentDate.getTime()) {
        // Today: include only if start time < now (or no time, assume past)
        if (!startTimeObj) {
          includeMatch = true;
          fullMatchTime = matchDateOnly; // Assume 00:00
        } else {
          fullMatchTime = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), startTimeObj.hh, startTimeObj.mm);
          if (fullMatchTime < now) {
            includeMatch = true;
            const hhStr = String(startTimeObj.hh).padStart(2, '0');
            const mmStr = String(startTimeObj.mm).padStart(2, '0');
            startTimeStr = `${hhStr}:${mmStr}`;
          }
        }
      } else {
        // Future date: exclude
        includeMatch = false;
      }
     
      if (includeMatch) {
        includedMatches.push({
          ...baseMatch,
          startTime: startTimeStr,
          _sortTime: fullMatchTime ? fullMatchTime.getTime() : 0
        });
      }
    });
   
    // Handle different endpoints
    if (path === 'sports' || e.parameter.path === 'sports') {
      // Return list of sports (from all rows, unfiltered)
      const sports = Array.from(sportsSet).sort();
      return ContentService.createTextOutput(JSON.stringify(sports))
        .setMimeType(ContentService.MimeType.JSON);
    }
   
    // Filter and sort included matches
    let filteredMatches;
    if (sport && sport !== '') {
      let sportIncluded = includedMatches.filter(m =>
        m.sport.toLowerCase() === sport.toLowerCase()
      );
      sportIncluded.sort((a, b) => a._sortTime - b._sortTime);
      filteredMatches = sportIncluded.map(({ _sortTime, ...m }) => m);
    } else {
      includedMatches.sort((a, b) => a._sortTime - b._sortTime);
      filteredMatches = includedMatches.map(({ _sortTime, ...m }) => m);
    }
   
    // Return scores
    return ContentService.createTextOutput(JSON.stringify(filteredMatches))
      .setMimeType(ContentService.MimeType.JSON);
   
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString(),
      message: 'Failed to fetch data from Google Sheet'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
/**
 * Helper function to format dates to short "DD MMM" format (e.g., "11 Jun")
 * Handles both Date objects and date strings
 */
function formatDate(dateValue) {
  if (!dateValue) return '';
 
  let parsedDate;
  if (dateValue instanceof Date) {
    parsedDate = new Date(dateValue);
  } else if (typeof dateValue === 'string') {
    parsedDate = new Date(dateValue.trim());
    if (isNaN(parsedDate.getTime())) {
      // Fallback parse for common formats (e.g., "Wed Jun 11 2025")
      const parts = dateValue.match(/(\w{3}) (\w{3}) (\d{1,2}) (\d{4})/i);
      if (parts) {
        const months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6,
                         aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
        const month = months[parts[2].toLowerCase().substring(0, 3)];
        if (!isNaN(month)) {
          parsedDate = new Date(parseInt(parts[4]), month, parseInt(parts[3]));
        }
      }
    }
  } else {
    return dateValue.toString();
  }
 
  if (!parsedDate || isNaN(parsedDate.getTime())) return dateValue.toString();
 
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[parsedDate.getMonth()];
  const day = parsedDate.getDate();
  return `${day} ${month}`;
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