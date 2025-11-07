# Google Sheets Integration Setup Guide

This guide will help you connect your Surge Score Portal to a Google Sheet using Google Apps Script.

## 📋 Prerequisites

- A Google account
- A Google Sheet with your sports data
- Access to deploy Google Apps Script

## 📊 Step 1: Prepare Your Google Sheet

### Sheet Structure

Your Google Sheet should have the following columns (in this exact order):

| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H |
|----------|----------|----------|----------|----------|----------|----------|----------|
| **Sport** | **Date** | **Team1** | **Team2** | **Winner** | **MatchType** | **Points** | **TimeSlot** (optional) |

### Example Data

| Sport | Date | Team1 | Team2 | Winner | MatchType | Points | TimeSlot |
|-------|------|-------|-------|--------|-----------|--------|----------|
| Cricket | Nov 5, 2025 | Team Alpha | Team Beta | Team Alpha | T20 | 145/6 - 142/8 | 10:00 AM |
| Football | Nov 4, 2025 | FC Warriors | FC Legends | FC Warriors | League | 3-1 | 2:30 PM |
| Badminton | Nov 3, 2025 | V. Axelsen | L. Zii Jia | V. Axelsen | Singles | 21-19, 21-15 | 4:00 PM |

**Important Notes:**
- Row 1 should contain headers (Sport, Date, Team1, etc.)
- Data starts from Row 2
- Empty rows will be skipped automatically
- Dates can be in any format (they'll be formatted automatically)
- **TimeSlot column (Column H) is optional** - You can add time slot data here for your own reference, but it will **NOT be displayed on the frontend**. This is useful for internal organization or scheduling purposes.

## 🔧 Step 2: Set Up Google Apps Script

### 2.1 Open Apps Script Editor

1. Open your Google Sheet
2. Click **Extensions** → **Apps Script**
3. A new tab will open with the Apps Script editor

### 2.2 Copy the Script

1. In the Apps Script editor, delete any default code
2. Open the file `google-apps-script.js` from this project
3. Copy the entire contents
4. Paste it into the Apps Script editor

### 2.3 Configure the Script

In the Apps Script editor, find these lines near the top:

```javascript
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Sheet1';
```

**Update SPREADSHEET_ID:**
- Look at your Google Sheet URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
- Copy the `SPREADSHEET_ID` (the long string between `/d/` and `/edit`)
- Replace `'YOUR_SPREADSHEET_ID_HERE'` with your actual spreadsheet ID

**Update SHEET_NAME:**
- Replace `'Sheet1'` with your actual sheet name (the tab name at the bottom)
- If your sheet tab is named "Scores", use `'Scores'`
- Keep the quotes around the name

### 2.4 Save the Script

1. Click **File** → **Save** (or press `Ctrl+S` / `Cmd+S`)
2. Give your project a name (e.g., "Surge Score API")

## 🚀 Step 3: Deploy as Web App

### 3.1 Create Deployment

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**

### 3.2 Configure Deployment Settings

Fill in the deployment settings:

- **Description**: (optional) e.g., "Surge Score Portal API v1"
- **Execute as**: Select **Me** (your email)
- **Who has access**: Select **Anyone** (for public access)
  - Or **Anyone with Google account** for more security
- Click **Deploy**

### 3.3 Authorize the Script

1. A popup will ask you to authorize the script
2. Click **Authorize access**
3. Choose your Google account
4. You may see a warning about "Google hasn't verified this app"
   - Click **Advanced**
   - Click **Go to [Your Project Name] (unsafe)**
5. Click **Allow** to grant permissions

### 3.4 Copy the Web App URL

1. After deployment, you'll see a "Web app" dialog
2. Copy the **Web App URL** (it looks like: `https://script.google.com/macros/s/.../exec`)
3. **Important**: Keep this URL safe - you'll need it in the next step

## 🔐 Step 4: Configure Your Next.js App

### 4.1 Create Environment File

1. In your project root, create a file named `.env.local` (if it doesn't exist)
2. Add the following line:

```env
NEXT_PUBLIC_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

3. Replace `https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec` with the Web App URL you copied in Step 3.4

### 4.2 Restart Your Development Server

1. Stop your Next.js dev server (if running)
2. Start it again:
   ```bash
   npm run dev
   ```

## ✅ Step 5: Test the Integration

1. Open your portal in the browser
2. You should see data from your Google Sheet instead of dummy data
3. Check the browser console (F12) for any errors

### Troubleshooting

**If you see dummy data:**
- Check that `.env.local` has the correct `NEXT_PUBLIC_GOOGLE_SHEETS_API_URL`
- Make sure you restarted the dev server after adding the env variable
- Check browser console for errors

**If you see API errors:**
- Verify your Google Sheet ID is correct in the Apps Script
- Verify your sheet name matches exactly (case-sensitive)
- Make sure your sheet has the correct column structure
- Check that the Apps Script deployment is set to "Anyone" or "Anyone with Google account"

**If data doesn't update:**
- Google Apps Script caches responses. Wait a few seconds and refresh
- Make sure you're editing the correct sheet
- Check that new rows are added below the header row

## 🔄 Step 6: Auto-Update Feature

The portal will automatically fetch fresh data from Google Sheets each time:
- A page is loaded
- A sport is selected
- The "All Matches" view is opened

**Note**: Google Apps Script has rate limits. If you need real-time updates, consider:
- Using polling (refresh every few seconds)
- Implementing Server-Sent Events (SSE)
- Using a database with change streams instead

## 📝 Additional Notes

### Updating the Script

If you need to update the Apps Script:
1. Make changes in the Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click the pencil icon ✏️ next to your deployment
4. Click **New version**
5. Click **Deploy**
6. The Web App URL stays the same - no need to update `.env.local`

### Security

- The Web App URL is public - anyone with the URL can access your data
- For production, consider:
  - Using "Anyone with Google account" access
  - Adding authentication to your Next.js API routes
  - Using Google Sheets API with OAuth instead

### Rate Limits

Google Apps Script has quotas:
- 20,000 requests per day (free tier)
- 6 minutes execution time per request
- If you exceed limits, requests will fail

## 🆘 Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Check the Apps Script execution logs (View → Executions)
3. Test the Web App URL directly in your browser
4. Verify your sheet structure matches the requirements

