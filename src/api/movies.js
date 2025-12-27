// TMDB Proxy - Replace with your actual API endpoint
export const fetchMoviesByMood = async (mood) => {
  const moods = {
    happy: 'comedy',
    sad: 'drama',
    excited: 'action',
    relaxed: 'documentary',
    romantic: 'romance',
  }
  
  const genre = moods[mood] || 'comedy'
  
  // In production, this would call your backend proxy
  // For now, return mock data
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
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMovies[mood] || mockMovies.happy), 500)
  })
}

