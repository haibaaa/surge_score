# Surge Score Portal

A modern, responsive sports scoreboard portal built with Next.js, React, and TypeScript. Displays real-time sports scores and match results fetched from Google Sheets.

## 🚀 Features

- **Real-time Score Display**: Automatically fetches and displays sports scores from Google Sheets
- **Multi-Sport Support**: View scores for multiple sports (Cricket, Football, Badminton, etc.)
- **Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile devices
- **All Matches View**: See all matches across all sports in one place
- **Auto-refresh**: Fetches fresh data on every page load and navigation
- **Fallback Data**: Uses dummy data when Google Sheets API is not configured

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Google Account** (for Google Sheets integration - see [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md))

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd surge_score
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- Next.js (React framework)
- React & React DOM
- TypeScript
- Tailwind CSS (for styling)

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Google Sheets API Configuration
# Get this URL from Google Apps Script deployment (see GOOGLE_SHEETS_SETUP.md)
NEXT_PUBLIC_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

**Note**: If you don't set this variable, the app will use dummy data for development/testing purposes.

## 🏃 Running the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

The page will automatically reload when you make changes to the code.

## 📁 Project Structure

```
surge_score/
├── app/                      # Next.js App Router directory
│   ├── api/                  # API routes
│   │   ├── sports/          # GET /api/sports - Fetch sports list
│   │   └── scores/          # GET /api/scores - Fetch scores
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page component
│   └── page.css             # Page-specific styles
├── lib/                      # Utility functions
│   ├── api.ts               # API client functions
│   └── dummyData.ts         # Fallback dummy data
├── public/                   # Static assets
│   └── image.png            # Logo image
├── google-apps-script.js     # Google Apps Script code
├── GOOGLE_SHEETS_SETUP.md   # Google Sheets integration guide
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies
```

## 📜 Available Scripts

### Development

```bash
npm run dev
```
Starts the development server on [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```
Creates an optimized production build of your application.

### Start Production Server

```bash
npm start
```
Starts the production server (run `npm run build` first).

## 🔧 Development Guide

### Adding New Features

1. **API Routes**: Add new API routes in `app/api/`
2. **Components**: Create React components in `app/` or a `components/` directory
3. **Styles**: Use Tailwind CSS classes or add custom CSS in `app/globals.css`
4. **Types**: Define TypeScript types in `lib/` or create a `types/` directory

### Code Structure

- **Client Components**: Use `"use client"` directive for interactive components
- **Server Components**: Default in Next.js App Router (no directive needed)
- **API Routes**: Server-side routes in `app/api/` directory

### Styling

This project uses **Tailwind CSS** for styling. You can:

- Use Tailwind utility classes directly in JSX
- Add custom styles in `app/globals.css`
- Configure Tailwind in `tailwind.config.js`

## 🔌 Google Sheets Integration

To connect your portal to Google Sheets:

1. Follow the detailed guide in [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
2. Set up Google Apps Script using `google-apps-script.js`
3. Deploy the script as a Web App
4. Add the Web App URL to `.env.local`

**Without Google Sheets**: The app will automatically use dummy data for development.

## 🎨 Customization

### Changing Colors/Theme

Edit `app/globals.css` or `tailwind.config.js` to customize the theme.

### Modifying Layout

- **Navbar**: Edit `app/page.tsx` - `Navbar` component
- **Sports Navigation**: Edit `app/page.tsx` - `SportsNav` component
- **Scoreboard Table**: Edit `app/page.tsx` - `ScoreboardTable` component

### Adding New Sports

Add new sports by updating your Google Sheet. The app will automatically detect and display them.

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Kill the process using port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found Errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Google Sheets Not Loading

1. Check that `NEXT_PUBLIC_GOOGLE_SHEETS_API_URL` is set in `.env.local`
2. Verify the Google Apps Script is deployed correctly
3. Check browser console for error messages
4. Ensure the Google Sheet has the correct column structure

### TypeScript Errors

```bash
# Restart TypeScript server in your IDE
# Or rebuild the project
npm run build
```

## 📦 Building for Production

### 1. Build the Application

```bash
npm run build
```

### 2. Test the Production Build Locally

```bash
npm start
```

### 3. Deploy

You can deploy this Next.js app to various platforms:

- **Vercel** (Recommended): [Deploy to Vercel](https://vercel.com/docs)
- **Netlify**: [Deploy to Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
- **AWS**: Use AWS Amplify or EC2
- **Docker**: Create a Dockerfile and deploy to any container platform

### Environment Variables in Production

Make sure to set `NEXT_PUBLIC_GOOGLE_SHEETS_API_URL` in your production environment:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Other platforms: Check their documentation

## 🧪 Testing

Currently, the app uses dummy data as a fallback. To test:

1. **Without Google Sheets**: Just run `npm run dev` - dummy data will be used
2. **With Google Sheets**: Set up Google Sheets integration and test with real data

## 📚 Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Source**: Google Sheets (via Google Apps Script)

## 🔐 Security Notes

- The Google Apps Script Web App URL is public - anyone with the URL can access your data
- For production, consider:
  - Using "Anyone with Google account" access in Apps Script
  - Adding authentication to your Next.js API routes
  - Using Google Sheets API with OAuth instead

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or issues, contact the project maintainer.

## 📞 Support

For issues related to:
- **Next.js/React**: Check the [Next.js Documentation](https://nextjs.org/docs)
- **Google Sheets Integration**: See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
- **General Issues**: Check the browser console for error messages

## 🎯 Next Steps

After setting up the project:

1. ✅ Install dependencies (`npm install`)
2. ✅ Set up Google Sheets integration (optional)
3. ✅ Run development server (`npm run dev`)
4. ✅ Customize the UI and add features
5. ✅ Deploy to production

---

**Happy Coding! 🚀**
