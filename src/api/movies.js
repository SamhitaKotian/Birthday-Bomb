// Fetch movies from TMDB API directly (with API key from environment)
// Using CORS proxy for client-side access
export const fetchMoviesByMood = async (mood) => {
  // Map moods to TMDB genre IDs
  const moodToGenre = {
    happy: 35,      // Comedy
    sad: 18,        // Drama
    excited: 28,    // Action
    relaxed: 99,    // Documentary
    romantic: 10749 // Romance
  }

  const genreId = moodToGenre[mood] || 35
  
  // Debug: Check all environment variables
  
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY


  // If no API key, use mock data
  if (!TMDB_API_KEY) {
    console.warn('⚠️ No TMDB API key found (VITE_TMDB_API_KEY), using mock data')
    console.log('💡 Add VITE_TMDB_API_KEY to Vercel environment variables')
    return getMockMovies(mood)
  }

  try {
    // Call TMDB API directly with CORS proxy
    const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=1&language=en-US`
    
    // Try direct fetch first (might work if CORS allows)
    let response
    try {
      response = await fetch(tmdbUrl)
      if (!response.ok) throw new Error('Direct fetch failed')
    } catch (directError) {
      // If direct fails, use CORS proxy
      console.log('Direct fetch failed, trying CORS proxy...')
      const proxyUrl = 'https://api.allorigins.win/raw?url='
      response = await fetch(`${proxyUrl}${encodeURIComponent(tmdbUrl)}`)
    }
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.results || data.results.length === 0) {
      throw new Error('No movies found')
    }
    
    console.log(`✅ Found ${data.results.length} movies for ${mood}`)
    
    // Transform TMDB data to our format
    const movies = data.results.slice(0, 6).map((movie) => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
      poster: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : '🎬',
      overview: movie.overview,
      rating: movie.vote_average,
    }))
    
    return movies
  } catch (error) {
    console.error('❌ Error fetching movies from TMDB:', error)
    console.log('🔄 Falling back to mock data')
    // Fallback to mock data if API fails
    return getMockMovies(mood)
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

