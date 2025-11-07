# Debugging Checklist: Why Can't I Fetch Data from Google Sheets?

**Note:** This app connects to **Google Sheets** (not Excel). If you're using Excel, you'll need to:
1. Convert your Excel file to Google Sheets, OR
2. Use a different integration method

## ✅ Step-by-Step Debugging Checklist

### 1. Check Environment Variable

**File:** `.env.local` (in project root)

**Should contain:**
```env
NEXT_PUBLIC_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

**Check:**
- [ ] File exists in project root
- [ ] Variable name is exactly `NEXT_PUBLIC_GOOGLE_SHEETS_API_URL` (no typos)
- [ ] URL is correct (starts with `https://script.google.com/macros/s/`)
- [ ] No extra spaces or quotes around the URL
- [ ] You restarted the dev server after adding/changing it

**Test:** Open terminal and run:
```bash
# Check if variable is loaded (should show your URL)
echo $NEXT_PUBLIC_GOOGLE_SHEETS_API_URL
```

---

### 2. Test Google Apps Script URL Directly

**Open this URL in your browser:**
```
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

**Expected Results:**

✅ **Good:** You see JSON data like:
```json
["Cricket", "Football", "Badminton"]
```
or
```json
[{"id": 1, "sport": "Cricket", "date": "Nov 5, 2025", ...}]
```

❌ **Bad - Sign-in Page:** You see Google sign-in page
- **Fix:** Authorize the script (see Step 3)

❌ **Bad - Error Page:** You see an error message
- **Fix:** Check Apps Script code and deployment

❌ **Bad - Blank/404:** URL is incorrect
- **Fix:** Get the correct URL from Apps Script deployment

---

### 3. Authorize Google Apps Script (If You See Sign-in Page)

1. **Open the Web App URL in browser**
2. **Click "Authorize access"**
3. **Select your Google account**
4. **If you see "Google hasn't verified this app":**
   - Click **"Advanced"**
   - Click **"Go to [Your Project Name] (unsafe)"**
5. **Click "Allow"**
6. **Test the URL again** - should now show JSON

---

### 4. Check Apps Script Deployment Settings

1. **Open Google Sheet**
2. **Extensions → Apps Script**
3. **Deploy → Manage deployments**
4. **Click pencil icon (✏️) to edit**
5. **Verify settings:**
   - [ ] **Execute as:** `Me (your-email@gmail.com)`
   - [ ] **Who has access:** `Anyone` ⚠️ **CRITICAL!**
6. **Click "Deploy"** (creates new version)
7. **Copy the Web App URL** (verify it's correct)

---

### 5. Verify Apps Script Code

**File:** `google-apps-script.js`

**Check these variables:**
```javascript
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';  // ← Update this
const SHEET_NAME = 'Sheet1';  // ← Update this if your sheet has different name
```

**How to find Spreadsheet ID:**
- Look at your Google Sheet URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
- Copy the long string between `/d/` and `/edit`

**How to find Sheet Name:**
- Look at the bottom tabs of your Google Sheet
- Use the exact tab name (case-sensitive)

---

### 6. Check Google Sheet Structure

**Your sheet should have these columns (in order):**

| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H |
|----------|----------|----------|----------|----------|----------|----------|----------|
| Sport | Date | Team1 | Team2 | Winner | MatchType | Points | TimeSlot (optional) |

**Check:**
- [ ] Row 1 has headers
- [ ] Data starts from Row 2
- [ ] At least one row of data exists
- [ ] Column A (Sport) is not empty for data rows

---

### 7. Test Apps Script Function

1. **Open Apps Script editor**
2. **Select `testScript` from function dropdown**
3. **Click "Run" (▶️)**
4. **Check "Execution log"** (View → Logs)
5. **Look for errors:**
   - ❌ "Spreadsheet not found" → Wrong SPREADSHEET_ID
   - ❌ "Sheet not found" → Wrong SHEET_NAME
   - ❌ "Permission denied" → Need to authorize
   - ✅ No errors → Script is working!

---

### 8. Check Browser Console

1. **Open your Next.js app** (http://localhost:3000)
2. **Open DevTools** (F12 or Right-click → Inspect)
3. **Go to Console tab**
4. **Look for messages:**
   - `📦 Using dummy data` → Environment variable not set
   - `⚠️ API fetch failed` → Check network tab for details
   - Red errors → Check the error message

---

### 9. Check Network Tab

1. **Open DevTools** (F12)
2. **Go to Network tab**
3. **Refresh the page**
4. **Look for:**
   - `/api/sports` request
   - `/api/scores` request
5. **Click on the request → Check:**
   - **Status:** Should be 200 (green)
   - **Response:** Should be JSON data
   - **If 500:** Check the error message in response

---

### 10. Check Terminal/Server Logs

**Look at your terminal where `npm run dev` is running:**

**Good signs:**
- ✅ No errors
- ✅ `GET /api/sports 200`
- ✅ `GET /api/scores 200`

**Bad signs:**
- ❌ `HTML instead of JSON` → Authorization issue
- ❌ `500 error` → Check error details
- ❌ `Google Sheets API URL not configured` → Check .env.local

---

## 🔍 Common Issues & Quick Fixes

### Issue 1: Always Shows Dummy Data
**Cause:** Environment variable not set or incorrect
**Fix:** 
1. Check `.env.local` exists and has correct URL
2. Restart dev server: `npm run dev`

### Issue 2: HTML Instead of JSON
**Cause:** Script not authorized or deployment settings wrong
**Fix:**
1. Authorize script (Step 3)
2. Set deployment to "Anyone" (Step 4)

### Issue 3: "Sheet not found" Error
**Cause:** Wrong SHEET_NAME in Apps Script
**Fix:** Update `SHEET_NAME` variable to match your sheet tab name

### Issue 4: "Spreadsheet not found" Error
**Cause:** Wrong SPREADSHEET_ID in Apps Script
**Fix:** Update `SPREADSHEET_ID` variable with correct ID from sheet URL

### Issue 5: Empty Data Array
**Cause:** No data in sheet or wrong column structure
**Fix:** 
1. Add data to sheet
2. Verify column structure matches requirements

---

## 🧪 Quick Test Commands

**Test if environment variable is loaded:**
```bash
# In your project directory
node -e "console.log(process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL)"
```

**Test Google Apps Script URL:**
```bash
# Replace YOUR_URL with your actual URL
curl "https://script.google.com/macros/s/YOUR_URL/exec?path=sports"
```

**Should return:** JSON array of sports

---

## 📞 Still Not Working?

1. **Check all items in the checklist above**
2. **Copy the exact error message** from:
   - Terminal/console
   - Browser console
   - Network tab
3. **Verify:**
   - Google Sheet has data
   - Apps Script is deployed correctly
   - Environment variable is set
   - Dev server was restarted

---

## 💡 Pro Tips

1. **Always restart dev server** after changing `.env.local`
2. **Test the Apps Script URL directly** in browser first
3. **Check browser console** for detailed error messages
4. **Use incognito mode** to test if it's a caching issue
5. **Verify sheet structure** matches exactly (column order matters!)

