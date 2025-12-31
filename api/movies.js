// Vercel Serverless Function - TMDB API Proxy
// This file should be in /api/movies.js (not /src/api/movies.js)

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { mood } = req.query

  if (!mood) {
    return res.status(400).json({ error: 'Mood parameter is required' })
  }

  // Map moods to TMDB genre IDs
  const moodToGenre = {
    happy: 35,      // Comedy
    sad: 18,        // Drama
    excited: 28,    // Action
    relaxed: 99,    // Documentary
    romantic: 10749 // Romance
  }

  const genreId = moodToGenre[mood] || 35 // Default to Comedy

  const TMDB_API_KEY = process.env.VITE_TMDB_API_KEY || process.env.TMDB_API_KEY

  if (!TMDB_API_KEY) {
    // Fallback to mock data if no API key
    return res.status(200).json(getMockMovies(mood))
  }

  try {
    // Fetch movies by genre from TMDB
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=1&language=en-US`
    )

    if (!response.ok) {
      throw new Error('TMDB API request failed')
    }

    const data = await response.json()
    
    // Transform TMDB data to our format
    const movies = data.results.slice(0, 6).map((movie) => ({
      id: movie.id,
      title: movie.title,
      year: new Date(movie.release_date).getFullYear(),
      poster: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : '🎬',
      overview: movie.overview,
      rating: movie.vote_average,
    }))

    return res.status(200).json(movies)
  } catch (error) {
    console.error('TMDB API Error:', error)
    // Fallback to mock data on error
    return res.status(200).json(getMockMovies(mood))
  }
}

function getMockMovies(mood) {
  const mockMovies = {
    happy: [
      { id: 1, title: 'The Grand Budapest Hotel', poster: '🎬', year: 2014 },
      { id: 2, title: 'Paddington 2', poster: '🐻', year: 2017 },
      { id: 3, title: 'Amélie', poster: '🎭', year: 2001 },
    ],
    sad: [
      { id: 4, title: 'The Shawshank Redemption', poster: '🎥', year: 1994 },
      { id: 5, title: 'Her', poster: '💔', year: 2013 },
    ],
    excited: [
      { id: 6, title: 'Mad Max: Fury Road', poster: '🏎️', year: 2015 },
      { id: 7, title: 'Inception', poster: '🌀', year: 2010 },
    ],
    relaxed: [
      { id: 8, title: 'My Neighbor Totoro', poster: '🌳', year: 1988 },
      { id: 9, title: 'Chef', poster: '👨‍🍳', year: 2014 },
    ],
    romantic: [
      { id: 10, title: 'Before Sunrise', poster: '🌅', year: 1995 },
      { id: 11, title: 'La La Land', poster: '🎵', year: 2016 },
    ],
  }
  return mockMovies[mood] || mockMovies.happy
}

