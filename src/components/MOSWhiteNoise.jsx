import { useState } from 'react'

const noiseTypes = [
  { id: 'rain', label: 'Rain', emoji: '🌧️', color: 'from-blue-400/30 to-blue-600/30' },
  { id: 'ocean', label: 'Ocean', emoji: '🌊', color: 'from-cyan-400/30 to-cyan-600/30' },
  { id: 'forest', label: 'Forest', emoji: '🌲', color: 'from-green-400/30 to-green-600/30' },
  { id: 'fire', label: 'Fireplace', emoji: '🔥', color: 'from-orange-400/30 to-red-600/30' },
]

export default function MOSWhiteNoise() {
  const [active, setActive] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">White Noise 🌊</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {noiseTypes.map((noise) => (
          <button
            key={noise.id}
            onClick={() => {
              setActive(noise.id)
              setIsPlaying(!isPlaying || active !== noise.id)
            }}
            className={`p-6 rounded-card bg-white hover:scale-105 transition-all duration-300 ease-out shadow-hover ${
              active === noise.id && isPlaying ? 'ring-4 ring-secondary' : ''
            }`}
          >
            <div className="text-4xl mb-2">{noise.emoji}</div>
            <div className="font-heading">{noise.label}</div>
            {active === noise.id && isPlaying && (
              <div className="text-xs text-secondary mt-2">Playing...</div>
            )}
          </button>
        ))}
      </div>

      {active && (
        <div className="mt-8">
          <div className={`relative h-32 bg-gradient-to-r ${noiseTypes.find(n => n.id === active)?.color} rounded-card overflow-hidden`}>
            <div
              className="absolute inset-0 bg-secondary/50"
              style={{
                animation: isPlaying ? 'waveform 2s ease-in-out infinite' : 'none',
              }}
            />
          </div>
          <div className="text-center mt-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-2 bg-secondary text-white rounded-card font-heading hover:scale-105 transition-all duration-300"
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

