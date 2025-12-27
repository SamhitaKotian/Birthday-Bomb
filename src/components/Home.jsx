import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoadingScreen from './LoadingScreen'
import TileGrid from './TileGrid'
import MoodMovie from './MoodMovie'
import SongOfTheDay from './SongOfTheDay'
import StressReliever from './StressReliever'
import Masti2min from './2minMasti'
import CafePicker from './CafePicker'
import CocktailPicker from './CocktailPicker'
import MOSWhiteNoise from './MOSWhiteNoise'
import MotivateActivate from './MotivateActivate'
import TreatYoself from './TreatYoself'
import RecipeKinks from './RecipeKinks'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [activeTile, setActiveTile] = useState(null)

  useEffect(() => {
    // Show confetti on first load
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
    
    // Hide loading after animation
    setTimeout(() => setLoading(false), 2500)
  }, [])

  const tiles = [
    { id: 'movie', component: MoodMovie, title: 'Movie Mood', icon: '🎬' },
    { id: 'music', component: SongOfTheDay, title: 'Song of the Day', icon: '🎵' },
    { id: 'cafe', component: CafePicker, title: 'Cafe Picker', icon: '☕' },
    { id: 'breath', component: StressReliever, title: 'Breathe', icon: '🌬️' },
    { id: 'puzzle', component: Masti2min, title: '2 Min Masti', icon: '🧩' },
    { id: 'cocktail', component: CocktailPicker, title: 'Cocktail', icon: '🍹' },
    { id: 'noise', component: MOSWhiteNoise, title: 'White Noise', icon: '🌊' },
    { id: 'quotes', component: MotivateActivate, title: 'Motivate', icon: '💪' },
    { id: 'treat', component: TreatYoself, title: 'Treat Yourself', icon: '🛍️' },
    { id: 'recipe', component: RecipeKinks, title: 'Recipe', icon: '👨‍🍳' },
  ]

  const handleTileClick = (tileId) => {
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
    setActiveTile(tileId)
  }

  const handleCloseModal = () => {
    setActiveTile(null)
  }

  const ActiveComponent = activeTile ? tiles.find(t => t.id === activeTile)?.component : null

  return (
    <div className="min-h-screen bg-background">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="confetti-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random()}s`,
                  }}
                />
              ))}
            </div>
          )}
          
          {/* QR Code Link */}
          <Link
            to="/qr"
            className="fixed top-4 right-4 z-50 bg-primary text-white px-6 py-3 rounded-card font-heading text-lg hover:scale-105 transition-all duration-300 ease-out shadow-hover hover:shadow-glow no-print"
            style={{
              animation: 'fadeInStagger 0.5s ease-out 0.3s both',
            }}
          >
            📱 QR Code
          </Link>
          
          <TileGrid tiles={tiles} onTileClick={handleTileClick} />
          
          {activeTile && ActiveComponent && (
            <div 
              className="fixed inset-0 z-50 backdrop-blur bg-black/30 flex items-center justify-center p-4"
              style={{
                animation: 'fadeInStagger 0.3s ease-out',
              }}
              onClick={handleCloseModal}
            >
              <div 
                className="bg-background rounded-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-glow transform transition-all duration-300 scale-100 relative"
                style={{
                  animation: 'popOpen 0.4s ease-out',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-neutral hover:text-primary transition-colors z-10"
                >
                  ✕
                </button>
                <ActiveComponent />
              </div>
            </div>
          )}
          
          <div className="fixed bottom-4 left-4 text-sm text-neutral/60 font-body">
            From Samhita 💝
          </div>
        </>
      )}
    </div>
  )
}

