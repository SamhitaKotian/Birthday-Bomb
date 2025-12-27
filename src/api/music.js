// Spotify Proxy - Replace with your actual API endpoint
export const fetchSongOfTheDay = async () => {
  // In production, this would call your backend proxy
  // For now, return mock data
  const songs = [
    {
      id: 1,
      title: 'Happy Birthday Mix',
      artist: 'Various Artists',
      album: 'Birthday Vibes',
      duration: '3:45',
      preview: '🎵',
    },
    {
      id: 2,
      title: 'Celebration',
      artist: 'Kool & The Gang',
      album: 'Celebrate!',
      duration: '4:58',
      preview: '🎶',
    },
    {
      id: 3,
      title: 'Birthday',
      artist: 'The Beatles',
      album: 'The White Album',
      duration: '2:42',
      preview: '🎸',
    },
  ]
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(songs[Math.floor(Math.random() * songs.length)]), 500)
  })
}

