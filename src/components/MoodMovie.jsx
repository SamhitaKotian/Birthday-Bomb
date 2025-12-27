import { useState, useEffect } from 'react'
import { fetchMoviesByMood } from '../api/movies'

const moods = [
  { id: 'happy', label: '😊 Happy', color: 'bg-yellow-200' },
  { id: 'sad', label: '😢 Sad', color: 'bg-blue-200' },
  { id: 'excited', label: '🎉 Excited', color: 'bg-red-200' },
  { id: 'relaxed', label: '😌 Relaxed', color: 'bg-green-200' },
  { id: 'romantic', label: '💕 Romantic', color: 'bg-pink-200' },
]

export default function MoodMovie() {
  const [selectedMood, setSelectedMood] = useState(null)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood)
    setLoading(true)
    const results = await fetchMoviesByMood(mood)
    setMovies(results)
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">Pick Your Mood 🎬</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood.id)}
            className={`p-4 rounded-card ${mood.color} hover:scale-105 transition-all duration-300 ease-out backdrop-blur hover:shadow-glow ${
              selectedMood === mood.id ? 'ring-4 ring-primary' : ''
            }`}
          >
            <div className="text-2xl mb-2">{mood.label.split(' ')[0]}</div>
            <div className="text-sm font-body">{mood.label.split(' ')[1]}</div>
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-pulse text-secondary">Loading movies...</div>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="bg-white rounded-card p-4 hover:scale-105 transition-all duration-300 ease-out shadow-hover backdrop-blur"
              style={{
                animation: `fadeInStagger 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="text-3xl mb-2">{movie.poster}</div>
              <h3 className="font-heading text-lg mb-1">{movie.title}</h3>
              <p className="text-sm text-neutral/60">{movie.year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

