import { useState, useEffect } from 'react'
import { fetchSongOfTheDay } from '../api/music'

export default function SongOfTheDay() {
  const [song, setSong] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSong = async () => {
      const data = await fetchSongOfTheDay()
      setSong(data)
      setLoading(false)
    }
    loadSong()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse text-secondary">Loading song...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">Song of the Day 🎵</h2>
      
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-card p-6 backdrop-blur">
        <div className="text-6xl mb-4 text-center">{song.preview}</div>
        <h3 className="text-2xl font-heading text-center mb-2">{song.title}</h3>
        <p className="text-center text-neutral/80 mb-1">{song.artist}</p>
        <p className="text-center text-sm text-neutral/60">{song.album}</p>
        <p className="text-center text-sm text-neutral/60 mt-2">{song.duration}</p>
      </div>

      {/* Waveform Animation */}
      <div className="mt-8">
        <div className="relative h-32 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-card overflow-hidden">
          <div
            className="absolute inset-0 bg-primary/50"
            style={{
              animation: 'waveform 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </div>
  )
}

