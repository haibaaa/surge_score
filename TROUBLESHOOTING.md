# Troubleshooting Guide

## Error: Google Apps Script Returns HTML (Sign-in Page)

If you're seeing this error:
```
Google Apps Script returned HTML instead of JSON
Response preview: <!doctype html><html...accounts.google.com/v3/signin/...
```

This means your Google Apps Script Web App is redirecting to a sign-in page instead of returning JSON data.

### Solution: Fix Authorization and Deployment Settings

#### Step 1: Authorize the Script (First Time Setup)

1. **Open your Google Apps Script Web App URL directly in a browser:**
   ```
   https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

2. **You'll see a Google sign-in page:**
   - Click **"Authorize access"** or **"Continue"**
   - Select your Google account
   - You may see a warning: **"Google hasn't verified this app"**
     - Click **"Advanced"**
     - Click **"Go to [Your Project Name] (unsafe)"**
   - Click **"Allow"** to grant permissions

3. **After authorization, you should see JSON data** (or an error message in JSON format)

#### Step 2: Update Deployment Settings

1. **Open your Google Sheet**
2. **Go to Extensions → Apps Script**
3. **Click Deploy → Manage deployments**
4. **Click the pencil icon (✏️) next to your deployment**
5. **Update these settings:**
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone` ⚠️ **This is critical!**
6. **Click Deploy** (this creates a new version)
7. **Copy the new Web App URL** (it should be the same, but verify)

#### Step 3: Test the URL Again

1. **Open the Web App URL in a new incognito/private browser window**
2. **You should see JSON data** without needing to sign in
3. **If you still see a sign-in page:**
   - Make sure "Who has access" is set to **"Anyone"** (not "Anyone with Google account")
   - Try creating a new deployment

#### Step 4: Update Your .env.local

Make sure your `.env.local` has the correct URL:

```env
NEXT_PUBLIC_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

#### Step 5: Restart Your Dev Server

```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

### Alternative: Test with Query Parameters

You can test the Web App URL with query parameters directly:

**For sports list:**
```
https://script.google.com/macros/s/YOUR_ID/exec?path=sports
```

**For all scores:**
```
https://script.google.com/macros/s/YOUR_ID/exec
```

**For specific sport:**
```
https://script.google.com/macros/s/YOUR_ID/exec?sport=Cricket
```

If these URLs work in your browser (show JSON), then the issue is resolved.

### Common Issues

#### Issue 1: "Who has access" is set to "Only myself"
- **Fix:** Change to "Anyone" in deployment settings

#### Issue 2: Script needs re-authorization
- **Fix:** Open the Web App URL in a browser and authorize again

#### Issue 3: Wrong Web App URL
- **Fix:** Copy the URL from "Manage deployments" → "Web app" section

#### Issue 4: Script has errors
- **Fix:** 
  1. Open Apps Script editor
  2. Click "Run" → Select `testScript` function
  3. Check "Execution log" for errors
  4. Fix any errors in the script

### Still Not Working?

1. **Check the Apps Script execution log:**
   - Apps Script editor → View → Executions
   - Look for failed executions and error messages

2. **Verify your Google Sheet:**
   - Make sure the sheet has data
   - Check that `SPREADSHEET_ID` in the script matches your sheet
   - Verify `SHEET_NAME` matches your sheet tab name

3. **Test the script function directly:**
   - In Apps Script editor, run `testScript` function
   - Check the logs for output

4. **Check browser console:**
   - Open your Next.js app
   - Open browser DevTools (F12)
   - Check Console tab for detailed error messages

