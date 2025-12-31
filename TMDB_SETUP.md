# TMDB API Setup Guide

## Step 1: Get Your TMDB API Key (Free)

1. Go to [TMDB (The Movie Database)](https://www.themoviedb.org/)
2. Sign up for a free account
3. Go to Settings → API
4. Request an API key (it's free and instant)
5. Copy your API key

## Step 2: Add API Key to Vercel

1. Go to your Vercel dashboard
2. Select your "Birthday-Bomb" project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `TMDB_API_KEY`
   - **Value**: Your TMDB API key
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**

## Step 3: Redeploy

After adding the environment variable:
1. Go to **Deployments** tab
2. Click the **⋯** menu on the latest deployment
3. Click **Redeploy**
4. Wait 2-3 minutes for deployment

## Step 4: Test

1. Visit your deployed app
2. Click on the **Movie Mood** tile
3. Select a mood (Happy, Sad, Excited, etc.)
4. You should see real movie posters and data from TMDB!

## Local Development

For local development, you have two options:

### Option A: Use Mock Data (Easiest)
- The app will automatically use mock data if no API key is found
- Perfect for development and testing

### Option B: Use Vercel CLI (For Real API Testing)
1. Install Vercel CLI: `npm install -g vercel` (or use `npx vercel`)
2. Run: `vercel dev`
3. This will start a local server with API routes working
4. Add your `TMDB_API_KEY` to `.env.local` file

## Mood to Genre Mapping

- 😊 **Happy** → Comedy (Genre ID: 35)
- 😢 **Sad** → Drama (Genre ID: 18)
- 🎉 **Excited** → Action (Genre ID: 28)
- 😌 **Relaxed** → Documentary (Genre ID: 99)
- 💕 **Romantic** → Romance (Genre ID: 10749)

## Troubleshooting

- **No movies showing?** Check that the API key is set in Vercel environment variables
- **Still seeing mock data?** Make sure you redeployed after adding the environment variable
- **API errors?** The app will automatically fall back to mock data if the API fails

