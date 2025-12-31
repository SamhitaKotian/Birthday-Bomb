// Fetch song of the day using iTunes Search API (free, no auth required)
// Falls back to mock data if API fails
export const fetchSongOfTheDay = async () => {
  // Curated list of popular/celebratory songs for birthday vibes
  const searchTerms = [
    'celebration',
    'happy birthday',
    'party',
    'dance',
    'joy',
    'festival',
    'celebration kool and the gang',
    'birthday beatles',
    'happy pharrell',
    'good vibes'
  ]

  const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)]

  try {
    // iTunes Search API - free, no auth needed
    const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(randomTerm)}&media=music&limit=20&entity=song`
    
    let response
    try {
      response = await fetch(itunesUrl)
      if (!response.ok) throw new Error('iTunes API request failed')
    } catch (fetchError) {
      // If direct fetch fails, try CORS proxy
      console.log('Direct fetch failed, trying CORS proxy...')
      const proxyUrl = 'https://api.allorigins.win/raw?url='
      response = await fetch(`${proxyUrl}${encodeURIComponent(itunesUrl)}`)
    }
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.results || data.results.length === 0) {
      throw new Error('No songs found')
    }
    
    // Filter for songs with artwork and preview
    const validSongs = data.results.filter(song => 
      song.artworkUrl100 && song.previewUrl
    )
    
    if (validSongs.length === 0) {
      // Fallback to any song with artwork
      const songsWithArtwork = data.results.filter(song => song.artworkUrl100)
      if (songsWithArtwork.length > 0) {
        return transformSong(songsWithArtwork[Math.floor(Math.random() * songsWithArtwork.length)])
      }
      throw new Error('No valid songs found')
    }
    
    const randomSong = validSongs[Math.floor(Math.random() * validSongs.length)]
    console.log(`✅ Found song: ${randomSong.trackName} by ${randomSong.artistName}`)
    
    return transformSong(randomSong)
  } catch (error) {
    console.error('❌ Error fetching song from iTunes:', error)
    console.log('🔄 Falling back to mock data')
    // Fallback to mock data if API fails
    return getMockSong()
  }
}

function transformSong(song) {
  // Convert milliseconds to MM:SS format
  const durationMs = song.trackTimeMillis || 0
  const minutes = Math.floor(durationMs / 60000)
  const seconds = Math.floor((durationMs % 60000) / 1000)
  const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`
  
  return {
    id: song.trackId,
    title: song.trackName || 'Unknown',
    artist: song.artistName || 'Unknown Artist',
    album: song.collectionName || 'Unknown Album',
    duration: duration,
    artwork: song.artworkUrl100?.replace('100x100', '300x300') || null,
    previewUrl: song.previewUrl || null,
    spotifyUrl: song.trackViewUrl || null,
    genre: song.primaryGenreName || null,
    releaseDate: song.releaseDate ? new Date(song.releaseDate).getFullYear() : null,
  }
}

function getMockSong() {
  const mockSongs = [
    {
      id: 1,
      title: 'Celebration',
      artist: 'Kool & The Gang',
      album: 'Celebrate!',
      duration: '4:58',
      artwork: null,
      previewUrl: null,
      spotifyUrl: null,
      genre: 'R&B/Soul',
      releaseDate: 1980,
    },
    {
      id: 2,
      title: 'Birthday',
      artist: 'The Beatles',
      album: 'The White Album',
      duration: '2:42',
      artwork: null,
      previewUrl: null,
      spotifyUrl: null,
      genre: 'Rock',
      releaseDate: 1968,
    },
    {
      id: 3,
      title: 'Happy',
      artist: 'Pharrell Williams',
      album: 'Despicable Me 2',
      duration: '3:53',
      artwork: null,
      previewUrl: null,
      spotifyUrl: null,
      genre: 'Pop',
      releaseDate: 2013,
    },
    {
      id: 4,
      title: 'Dancing Queen',
      artist: 'ABBA',
      album: 'Arrival',
      duration: '3:51',
      artwork: null,
      previewUrl: null,
      spotifyUrl: null,
      genre: 'Pop',
      releaseDate: 1976,
    },
    {
      id: 5,
      title: 'I Gotta Feeling',
      artist: 'The Black Eyed Peas',
      album: 'The E.N.D.',
      duration: '4:49',
      artwork: null,
      previewUrl: null,
      spotifyUrl: null,
      genre: 'Pop',
      releaseDate: 2009,
    },
  ]
  
  return mockSongs[Math.floor(Math.random() * mockSongs.length)]
}

