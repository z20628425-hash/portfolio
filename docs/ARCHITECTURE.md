# Prezent Prep Hub - Architecture Overview

## Technology Stack

- **Frontend Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS v4 + Custom Mesh Gradients + Glassmorphism UI
- **Icons**: Lucide React
- **Backend Entry Point**: `server.ts` (Express + Vite Server-side Middleware)
- **AI Integration**: Google Gen AI SDK (`@google/genai`) using Gemini 3.6 Flash
- **Deployment**: Vercel Serverless Function Engine + Cloud Run Containers

## Directory Architecture

```
/
├── server.ts                       # Express backend server with Gemini AI endpoints
├── src/
│   ├── main.tsx                    # React application entry point
│   ├── App.tsx                     # Main state container & modal coordinator
│   ├── types.ts                    # Global TypeScript interfaces
│   ├── data/
│   │   └── mockData.ts             # Initial datasets & leaderboard records
│   ├── components/
│   │   ├── Header.tsx              # Glassmorphic top navigation with i18n
│   │   ├── BottomNav.tsx           # Floating mobile navigation bar
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx      # Main dashboard with 3D School & IELTS Practicum
│   │   │   ├── CoursesScreen.tsx   # Subject courses catalog
│   │   │   ├── TestsScreen.tsx     # Mock test center & performance charts
│   │   │   ├── ProfileScreen.tsx   # Student profile & stats
│   │   │   ├── AdminScreen.tsx     # Platform administration & analytics
│   │   │   └── LoginScreen.tsx     # User sign in / registration
│   │   └── modals/
│   │       ├── IELTSPracticeModal.tsx # IELTS Speaking & Writing AI Examiner
│   │       ├── LeaderboardModal.tsx    # Top student rankings
│   │       ├── AITutorModal.tsx        # Multi-turn Gemini AI tutor & Voice mode
│   │       ├── RewardsGameModal.tsx    # Lucky Fortune Wheel & Coin store
│   │       └── ...
```
