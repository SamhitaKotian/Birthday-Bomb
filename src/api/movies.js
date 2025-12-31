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
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY

  // If no API key, use mock data
  if (!TMDB_API_KEY) {
    console.log('No TMDB API key found, using mock data')
    return getMockMovies(mood)
  }

  try {
    // Call TMDB API directly with CORS proxy
    // Using a public CORS proxy to avoid CORS issues
    const proxyUrl = 'https://api.allorigins.win/raw?url='
    const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=1&language=en-US`
    
    const response = await fetch(`${proxyUrl}${encodeURIComponent(tmdbUrl)}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies')
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
    
    return movies
  } catch (error) {
    console.error('Error fetching movies:', error)
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

