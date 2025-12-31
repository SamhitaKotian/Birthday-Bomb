import { useState, useEffect, useRef } from 'react'
import { fetchSongOfTheDay } from '../api/music'

export default function SongOfTheDay() {
  const [song, setSong] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [playingPreview, setPlayingPreview] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const loadSong = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchSongOfTheDay()
        setSong(data)
      } catch (err) {
        console.error('Error loading song:', err)
        setError('Failed to load song. Please try again.')
        // Still set a mock song on error
        const mockData = await fetchSongOfTheDay()
        setSong(mockData)
      } finally {
        setLoading(false)
      }
    }
    loadSong()
  }, [])

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handlePreviewClick = () => {
    if (!song?.previewUrl) return

    if (playingPreview && audioRef.current) {
      // Pause
      audioRef.current.pause()
      setPlayingPreview(false)
    } else {
      // Play
      if (!audioRef.current) {
        audioRef.current = new Audio(song.previewUrl)
        audioRef.current.onended = () => {
          setPlayingPreview(false)
          audioRef.current = null
        }
        audioRef.current.onerror = () => {
          setPlayingPreview(false)
          console.error('Preview playback failed')
          audioRef.current = null
        }
      }
      audioRef.current.play()
      setPlayingPreview(true)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse text-secondary text-lg">Loading your song of the day...</div>
        <div className="mt-4 flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-8 bg-primary rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s',
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (!song) {
    return (
      <div className="text-center py-8">
        <div className="text-secondary">No song available. Please try again.</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">Song of the Day 🎵</h2>
      
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-card text-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-card p-6 backdrop-blur">
        {/* Album Artwork */}
        <div className="flex flex-col items-center mb-4">
          {song.artwork ? (
            <img
              src={song.artwork}
              alt={`${song.album} cover`}
              className="w-48 h-48 rounded-card shadow-glow mb-4 object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                const fallback = e.target.nextElementSibling
                if (fallback) fallback.style.display = 'block'
              }}
            />
          ) : null}
          <div
            className="text-6xl mb-4 text-center"
            style={{ display: song.artwork ? 'none' : 'block' }}
          >
            🎵
          </div>
        </div>

        {/* Song Info */}
        <h3 className="text-2xl font-heading text-center mb-2">{song.title}</h3>
        <p className="text-center text-neutral/80 mb-1 font-medium">{song.artist}</p>
        <p className="text-center text-sm text-neutral/60 mb-1">{song.album}</p>
        
        <div className="flex items-center justify-center gap-4 mt-3 text-sm text-neutral/60">
          {song.duration && <span>⏱️ {song.duration}</span>}
          {song.genre && <span>🎵 {song.genre}</span>}
          {song.releaseDate && <span>📅 {song.releaseDate}</span>}
        </div>

        {/* Preview & Links */}
        <div className="flex gap-3 justify-center mt-6">
          {song.previewUrl && (
            <button
              onClick={handlePreviewClick}
              className={`px-6 py-2 rounded-card font-heading transition-all duration-300 ease-out ${
                playingPreview
                  ? 'bg-secondary text-white hover:scale-105'
                  : 'bg-primary text-white hover:scale-105'
              } shadow-hover hover:shadow-glow`}
            >
              {playingPreview ? '⏸️ Pause Preview' : '▶️ Play Preview'}
            </button>
          )}
          
          {song.spotifyUrl && (
            <a
              href={song.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-card font-heading bg-green-500 text-white hover:scale-105 transition-all duration-300 ease-out shadow-hover hover:shadow-glow"
            >
              🎧 Open in iTunes
            </a>
          )}
        </div>
      </div>

      {/* Waveform Animation */}
      <div className="mt-8">
        <div className="relative h-32 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-card overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary/70 rounded-full"
                style={{
                  height: `${20 + Math.random() * 60}%`,
                  animation: `waveformBar 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

