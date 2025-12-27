import { useState } from 'react'

const areas = [
  { id: 'tiong-bahru', name: 'Tiong Bahru', cafes: ['Tiong Bahru Bakery', '%ARABICA', 'Forty Hands'] },
  { id: 'orchard', name: 'Orchard', cafes: ['Common Man Coffee', 'Kith Cafe', 'Wild Honey'] },
  { id: 'sentosa', name: 'Sentosa', cafes: ['Coastal Settlement', 'The Cliff', 'Tanjong Beach Club'] },
]

export default function CafePicker() {
  const [selectedArea, setSelectedArea] = useState(null)
  const [flipped, setFlipped] = useState({})

  const handleFlip = (cafe) => {
    setFlipped(prev => ({
      ...prev,
      [cafe]: !prev[cafe]
    }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">Cafe Picker ☕</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {areas.map((area) => (
          <button
            key={area.id}
            onClick={() => setSelectedArea(area.id)}
            className={`p-4 rounded-card bg-white hover:scale-105 transition-all duration-300 ease-out shadow-hover ${
              selectedArea === area.id ? 'ring-4 ring-primary' : ''
            }`}
          >
            <div className="text-2xl mb-2">{area.name === 'Tiong Bahru' ? '🏘️' : area.name === 'Orchard' ? '🛍️' : '🏖️'}</div>
            <div className="font-heading">{area.name}</div>
          </button>
        ))}
      </div>

      {selectedArea && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {areas.find(a => a.id === selectedArea)?.cafes.map((cafe, index) => (
            <div
              key={cafe}
              className="relative h-48 cursor-pointer"
              onClick={() => handleFlip(cafe)}
              style={{
                perspective: '1000px',
              }}
            >
              <div
                className="absolute inset-0 bg-white rounded-card p-4 shadow-hover transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped[cafe] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden">
                  <div className="text-4xl mb-2">☕</div>
                  <div className="font-heading text-lg">{cafe}</div>
                  <div className="text-sm text-neutral/60 mt-2">Tap to flip</div>
                </div>
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center backface-hidden"
                  style={{
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="text-3xl mb-2">📸</div>
                  <div className="font-heading text-lg">{cafe}</div>
                  <div className="text-sm text-neutral/60 mt-2 text-center">Polaroid moment!</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

