# Prezent Prep Hub - Deployment Guide

## 1. Vercel Deployment

Prezent Prep Hub is configured with `vercel.json` for seamless deployment to Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

### Environment Variables on Vercel:
Add `GEMINI_API_KEY` under project settings -> Environment Variables.

---

## 2. Cloud Run Container Deployment

To build and run in production Docker / Cloud Run:

```bash
# Production Build
npm run build

# Start Production Server
npm run start
```

The production bundle compiles `server.ts` into `dist/server.cjs` and runs standalone Node.js.
